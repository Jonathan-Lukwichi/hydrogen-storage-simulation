"""Engineering Digital Opportunity Score (EDOS) - scoring engine.

The engine is deliberately boring. It reads a rule table from
config/scoring_config.json, applies it to a sheet of observed signals, and
returns a score together with a line-by-line explanation of where every point
came from. There is no hidden weighting and no model in the loop.

Design decision that differs from the original brief
----------------------------------------------------
The brief proposed scoring the digital gap most heavily. Scoring gap alone
selects for companies that are indifferent to marketing: the firm with no
website, no LinkedIn page and no marketing person scores highest and buys
nothing. The engine therefore splits the score into ability to pay (30),
reason to act (30) and gap (40), and applies an intent gate that discounts a
company showing no trigger and no marketing intent at all.
"""

from __future__ import annotations

import json
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any

CONFIG_PATH = Path(__file__).resolve().parent.parent / "config" / "scoring_config.json"


# --------------------------------------------------------------------------
# rule primitives
# --------------------------------------------------------------------------

def _apply_map(value: Any, table: dict[str, float]) -> float | None:
    if value is None:
        return None
    return table.get(str(value))


def _apply_bands(value: Any, bands: list[list[float]]) -> float | None:
    """bands are [threshold, points], highest threshold first. value >= threshold wins."""
    if value is None:
        return None
    for threshold, points in bands:
        if float(value) >= float(threshold):
            return float(points)
    return 0.0


def _apply_bands_inverse(value: Any, bands: list[list[float]]) -> float | None:
    """bands are [upper_bound, points], lowest bound first. value <= bound wins."""
    if value is None:
        return None
    for bound, points in bands:
        if float(value) <= float(bound):
            return float(points)
    return 0.0


def _apply_bool(value: Any, rule: dict[str, Any]) -> float | None:
    if value is None:
        return None
    key = "true" if bool(value) else "false"
    return float(rule.get(key, 0.0))


def _decay_multiplier(age_months: Any, decay: dict[str, float]) -> float:
    if age_months is None:
        return 1.0
    steps = sorted((float(k), float(v)) for k, v in decay.items())
    multiplier = steps[0][1]
    for threshold, value in steps:
        if float(age_months) >= threshold:
            multiplier = value
    return multiplier


def _evaluate_rule(rule: dict[str, Any], sheet: dict[str, Any]) -> tuple[float | None, str]:
    """Return (points_or_None, human explanation). None means the signal was not observed."""
    name = rule["signal"]
    value = sheet.get(name)

    if "map" in rule:
        pts = _apply_map(value, rule["map"])
    elif "bands" in rule:
        pts = _apply_bands(value, rule["bands"])
    elif "bands_inverse" in rule:
        pts = _apply_bands_inverse(value, rule["bands_inverse"])
    elif "true" in rule or "false" in rule:
        pts = _apply_bool(value, rule)
    elif "decay" in rule:
        return None, f"{name}: decay factor, applied by the dimension"
    else:
        raise ValueError(f"rule for {name} has no recognised rule type")

    if pts is None:
        return None, f"{name}: NOT OBSERVED - no points awarded"
    return pts, f"{name} = {value!r} -> {pts:g} pts"


# --------------------------------------------------------------------------
# dimension and group scoring
# --------------------------------------------------------------------------

def _score_dimension(dim_name: str, spec: dict[str, Any], sheet: dict[str, Any]) -> "DimensionResult":
    combine = spec.get("combine", "sum")
    rules = spec["rules"]
    lines: list[str] = []
    observed = 0
    total_rules = 0

    if combine == "map_times_decay":
        base_rule = rules[0]
        base, line = _evaluate_rule(base_rule, sheet)
        lines.append(line)
        total_rules += 1
        if base is None:
            return DimensionResult(dim_name, 0.0, spec["max"], lines, 0, total_rules)
        observed += 1
        decay_rule = next((r for r in rules if "decay" in r), None)
        multiplier = 1.0
        if decay_rule is not None:
            age = sheet.get(decay_rule["signal"])
            multiplier = _decay_multiplier(age, decay_rule["decay"])
            total_rules += 1
            if age is not None:
                observed += 1
            lines.append(f"{decay_rule['signal']} = {age!r} -> x{multiplier:g} recency factor")
        raw = base * multiplier
        return DimensionResult(dim_name, min(raw, spec["max"]), spec["max"], lines, observed, total_rules)

    scores: list[float] = []
    additive: list[float] = []
    for rule in rules:
        total_rules += 1
        pts, line = _evaluate_rule(rule, sheet)
        lines.append(line)
        if pts is None:
            continue
        observed += 1
        if rule.get("additive"):
            additive.append(pts)
        else:
            scores.append(pts)

    if not scores and not additive:
        raw = 0.0
    elif combine == "sum":
        raw = sum(scores) + sum(additive)
    elif combine == "max":
        raw = max(scores) if scores else 0.0
    elif combine == "max_of_rules_then_additive":
        raw = (max(scores) if scores else 0.0) + sum(additive)
    else:
        raise ValueError(f"unknown combine strategy {combine!r}")

    return DimensionResult(dim_name, min(raw, spec["max"]), spec["max"], lines, observed, total_rules)


@dataclass
class DimensionResult:
    name: str
    points: float
    max_points: float
    explanation: list[str]
    signals_observed: int
    signals_possible: int


@dataclass
class ScoreResult:
    company_id: str
    company_name: str
    score: float
    band: str
    band_label: str
    band_action: str
    completeness: float
    actionable: bool
    group_totals: dict[str, float] = field(default_factory=dict)
    dimensions: list[DimensionResult] = field(default_factory=list)
    bonus_points: float = 0.0
    modifiers_applied: list[str] = field(default_factory=list)
    missing_required_signals: list[str] = field(default_factory=list)

    def to_dict(self) -> dict[str, Any]:
        return {
            "company_id": self.company_id,
            "company_name": self.company_name,
            "score": round(self.score, 1),
            "band": self.band,
            "band_label": self.band_label,
            "band_action": self.band_action,
            "completeness": round(self.completeness, 2),
            "actionable": self.actionable,
            "capacity": round(self.group_totals.get("capacity", 0.0), 1),
            "motive": round(self.group_totals.get("motive", 0.0), 1),
            "gap": round(self.group_totals.get("gap", 0.0), 1),
            "bonus_3d": round(self.bonus_points, 1),
            "modifiers": "; ".join(self.modifiers_applied) or "none",
            "missing_required_signals": "; ".join(self.missing_required_signals) or "none",
        }


def load_config(path: Path | str = CONFIG_PATH) -> dict[str, Any]:
    with open(path, encoding="utf-8") as fh:
        return json.load(fh)


def score_company(sheet: dict[str, Any],
                  company_id: str = "",
                  company_name: str = "",
                  config: dict[str, Any] | None = None) -> ScoreResult:
    """Score one company from its signal sheet."""
    cfg = config or load_config()
    dimensions: list[DimensionResult] = []
    group_totals: dict[str, float] = {}
    dim_points: dict[str, float] = {}

    for group_name, group in cfg["groups"].items():
        group_total = 0.0
        for dim_name, spec in group["dimensions"].items():
            result = _score_dimension(dim_name, spec, sheet)
            dimensions.append(result)
            dim_points[dim_name] = result.points
            group_total += result.points
        group_total = min(group_total, group["max"])
        group_totals[group_name] = group_total

    base = sum(group_totals.values())

    bonus = 0.0
    bonus_spec = cfg.get("bonuses", {}).get("immersive_3d_fit")
    if bonus_spec:
        for rule in bonus_spec["rules"]:
            pts, _ = _evaluate_rule(rule, sheet)
            if pts:
                bonus += pts
        bonus = min(bonus, bonus_spec["max"])

    score = base + bonus

    modifiers_applied: list[str] = []
    if dim_points.get("marketing_intent", 0) == 0 and dim_points.get("trigger_event", 0) == 0:
        score *= 0.6
        modifiers_applied.append("intent_gate x0.6 (no trigger and no marketing intent)")
    if sheet.get("decision_maker_identified") is False:
        score *= 0.85
        modifiers_applied.append("no_decision_maker x0.85")
    if sheet.get("requires_french_or_offshore_delivery") is True:
        score *= 0.9
        modifiers_applied.append("offshore_or_french_delivery x0.9")

    score = max(0.0, min(100.0, score))

    from signals import REQUIRED  # local import keeps this module importable standalone
    missing = [name for name in REQUIRED if sheet.get(name) is None]
    completeness = 1.0 - (len(missing) / len(REQUIRED)) if REQUIRED else 1.0
    min_ok = cfg.get("confidence", {}).get("min_actionable_completeness", 0.6)

    band = next(b for b in cfg["bands"] if score >= b["min"])

    return ScoreResult(
        company_id=company_id,
        company_name=company_name,
        score=score,
        band=band["tier"],
        band_label=band["label"],
        band_action=band["action"],
        completeness=completeness,
        actionable=completeness >= min_ok,
        group_totals=group_totals,
        dimensions=dimensions,
        bonus_points=bonus,
        modifiers_applied=modifiers_applied,
        missing_required_signals=missing,
    )


def explain(result: ScoreResult) -> str:
    """Full human-readable derivation of a score. Paste this into a sales brief."""
    out = [f"{result.company_name or result.company_id}: {result.score:.1f}/100 "
           f"(Tier {result.band} - {result.band_label})",
           f"completeness {result.completeness:.0%} "
           f"{'- ACTIONABLE' if result.actionable else '- TOO INCOMPLETE TO ACT ON'}",
           ""]
    for group, total in result.group_totals.items():
        out.append(f"[{group}] {total:.1f}")
        for dim in result.dimensions:
            if dim.name in _dims_of_group(group):
                out.append(f"  {dim.name}: {dim.points:.1f}/{dim.max_points:g}")
                out.extend(f"    - {line}" for line in dim.explanation)
    if result.bonus_points:
        out.append(f"[bonus] 3D/immersive fit: +{result.bonus_points:.1f}")
    for mod in result.modifiers_applied:
        out.append(f"[modifier] {mod}")
    if result.missing_required_signals:
        out.append(f"[missing] {', '.join(result.missing_required_signals)}")
    return "\n".join(out)


_GROUP_CACHE: dict[str, set[str]] = {}


def _dims_of_group(group: str) -> set[str]:
    if not _GROUP_CACHE:
        cfg = load_config()
        for name, spec in cfg["groups"].items():
            _GROUP_CACHE[name] = set(spec["dimensions"])
    return _GROUP_CACHE.get(group, set())
