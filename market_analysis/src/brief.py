"""Turn a scored prospect into a one-page sales brief."""

from __future__ import annotations

from typing import Any

from scoring import ScoreResult

# Which gap maps to which first offer. Ordered by how easy the offer is to sell.
OFFER_MAP = [
    ("storytelling_gap", "Project Digital Showcase",
     "One recent project turned into a written case study, a set of properly treated "
     "images and a LinkedIn sequence."),
    ("content_cadence_gap", "Capability Content Programme",
     "A monthly run of technical posts built from work the company has already done."),
    ("website_gap", "Website Credibility Rebuild",
     "Rebuild the site around projects, capability and one clear enquiry route."),
    ("visual_quality_gap", "Project Photography and Visual Standard",
     "A repeatable visual standard for site photography and technical graphics."),
    ("lead_capture_gap", "Enquiry Route Fix",
     "Add a working enquiry path and measurement so business development can see what arrives."),
]

GAP_LABELS = {
    "website_gap": "Website is dated, thin or hard to use on a phone",
    "content_cadence_gap": "Little or no regular publishing",
    "visual_quality_gap": "Visual material does not match the quality of the engineering",
    "storytelling_gap": "Projects are not told as stories a buyer can follow",
    "lead_capture_gap": "No clear way for a new enquiry to arrive or be measured",
}


def build_brief(result: ScoreResult, sheet: dict[str, Any], company_row: dict[str, str]) -> str:
    gaps = sorted(
        (d for d in result.dimensions if d.name in GAP_LABELS),
        key=lambda d: d.points / d.max_points if d.max_points else 0,
        reverse=True,
    )
    top_gaps = [g for g in gaps if g.points > 0][:5]

    offer = next(
        (label, blurb) for name, label, blurb in OFFER_MAP
        if any(g.name == name for g in top_gaps[:2])
    ) if top_gaps else ("Mini Digital Audit", "A short written review of how the company appears to a new buyer.")

    trigger = sheet.get("trigger_type") or "none found"
    trigger_url = sheet.get("trigger_evidence_url") or "NO EVIDENCE LINK - do not contact until you have one"

    lines = [
        f"# {result.company_name}",
        "",
        f"**Engineering Digital Opportunity Score: {result.score:.0f}/100** "
        f"(Tier {result.band} - {result.band_label})  ",
        f"Evidence completeness: {result.completeness:.0%}"
        f"{'' if result.actionable else '  :warning: TOO INCOMPLETE TO CONTACT'}",
        "",
        f"- Sector: {company_row.get('sector','')} / {company_row.get('subsector','')}",
        f"- Location: {company_row.get('city_region','')}, {company_row.get('country','')}",
        f"- Size estimate: {company_row.get('size_band_estimated','')} "
        f"({company_row.get('size_basis','')})",
        f"- Website: {company_row.get('website') or 'none found'}",
        "",
        "## Business trigger",
        f"{trigger} ({sheet.get('trigger_age_months','?')} months ago)  ",
        f"Evidence: {trigger_url}",
        "",
        "## Top opportunities",
    ]
    if top_gaps:
        for i, gap in enumerate(top_gaps, 1):
            lines.append(f"{i}. {GAP_LABELS[gap.name]} ({gap.points:.0f}/{gap.max_points:g})")
    else:
        lines.append("None identified from the evidence collected. Do not pitch yet.")

    lines += [
        "",
        "## Recommended first offer",
        f"**{offer[0]}** - {offer[1]}",
        "",
        "## Score derivation",
        "```",
    ]
    for group, total in result.group_totals.items():
        lines.append(f"{group:10s} {total:5.1f}")
    lines.append(f"{'bonus 3D':10s} {result.bonus_points:5.1f}")
    for mod in result.modifiers_applied:
        lines.append(f"modifier: {mod}")
    lines.append("```")

    if result.missing_required_signals:
        lines += ["", "## Missing evidence (fill before contact)",
                  *[f"- {m}" for m in result.missing_required_signals]]

    lines += [
        "",
        "## Contact rules",
        "- POPIA s.69: no unsolicited email to a named individual without opt-in consent. "
        "Use LinkedIn, phone, a role-based address, or a warm introduction.",
        "- Lead with the company's own project. Do not lead with AI.",
    ]
    return "\n".join(lines)
