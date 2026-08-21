"""EDOS pipeline CLI.

    python3 src/pipeline.py template  --out data/signals_template.csv
    python3 src/pipeline.py audit     --companies data/companies.csv --out data/audited_signals.csv
    python3 src/pipeline.py score     --signals data/signals.csv --out data/digital_scores.csv
    python3 src/pipeline.py briefs    --signals data/signals.csv --out prospects/

`audit` needs network access and `pip install requests beautifulsoup4`.
`template`, `score` and `briefs` are pure standard library.
"""

from __future__ import annotations

import argparse
import csv
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from brief import build_brief            # noqa: E402
from scoring import score_company, explain  # noqa: E402
from signals import SIGNALS, blank_sheet  # noqa: E402

ROOT = Path(__file__).resolve().parent.parent

TRUE = {"true", "yes", "y", "1"}
FALSE = {"false", "no", "n", "0"}


def _coerce(name: str, raw: str):
    raw = (raw or "").strip()
    if raw == "":
        return None
    spec = next((s for s in SIGNALS if s.name == name), None)
    if spec is None:
        return raw
    if spec.kind == "bool":
        low = raw.lower()
        if low in TRUE:
            return True
        if low in FALSE:
            return False
        return None
    if spec.kind == "int":
        try:
            return int(float(raw))
        except ValueError:
            return None
    if spec.kind == "float":
        try:
            return float(raw)
        except ValueError:
            return None
    return raw


def _read_companies(path: Path) -> list[dict[str, str]]:
    with open(path, newline="", encoding="utf-8") as fh:
        return list(csv.DictReader(fh))


def cmd_template(args) -> None:
    companies = _read_companies(Path(args.companies))
    fields = ["company_id", "company_name"] + [s.name for s in SIGNALS]
    out = Path(args.out)
    out.parent.mkdir(parents=True, exist_ok=True)
    with open(out, "w", newline="", encoding="utf-8") as fh:
        writer = csv.DictWriter(fh, fieldnames=fields)
        writer.writeheader()
        for row in companies:
            writer.writerow({"company_id": row["company_id"], "company_name": row["company_name"]})
    print(f"Wrote {out} - {len(companies)} rows, {len(SIGNALS)} signal columns to fill.")
    print("\nWhat each column asks:")
    for s in SIGNALS:
        flag = "REQUIRED" if s.required else "optional"
        print(f"  {s.name:48s} [{flag:8s}] [{s.collection}] {s.question}")


def cmd_audit(args) -> None:
    from audit import audit_many
    companies = _read_companies(Path(args.companies))
    with_urls = [c for c in companies if c.get("website")]
    print(f"{len(with_urls)} of {len(companies)} companies have a URL on file.")
    results = audit_many(with_urls)
    fields = sorted({k for r in results for k in r})
    out = Path(args.out)
    out.parent.mkdir(parents=True, exist_ok=True)
    with open(out, "w", newline="", encoding="utf-8") as fh:
        writer = csv.DictWriter(fh, fieldnames=fields)
        writer.writeheader()
        writer.writerows(results)
    print(f"\nWrote {out}. Merge these columns into your signals sheet, then fill the manual ones.")


def _load_sheets(path: Path) -> list[tuple[dict, dict]]:
    sheets = []
    with open(path, newline="", encoding="utf-8") as fh:
        for row in csv.DictReader(fh):
            sheet = blank_sheet()
            for name in sheet:
                if name in row:
                    sheet[name] = _coerce(name, row[name])
            sheets.append((row, sheet))
    return sheets


def cmd_score(args) -> None:
    sheets = _load_sheets(Path(args.signals))
    results = [score_company(sheet, row.get("company_id", ""), row.get("company_name", ""))
               for row, sheet in sheets]
    results.sort(key=lambda r: r.score, reverse=True)
    out = Path(args.out)
    out.parent.mkdir(parents=True, exist_ok=True)
    rows = [r.to_dict() for r in results]
    with open(out, "w", newline="", encoding="utf-8") as fh:
        writer = csv.DictWriter(fh, fieldnames=list(rows[0]) if rows else ["company_id"])
        writer.writeheader()
        writer.writerows(rows)
    print(f"Wrote {out}\n")
    for r in results[:20]:
        flag = "" if r.actionable else "  (incomplete)"
        print(f"  {r.score:5.1f}  {r.band}  {r.company_name}{flag}")
    if args.explain:
        print("\n" + "=" * 70)
        for r in results[: args.explain]:
            print(explain(r))
            print("-" * 70)


def cmd_briefs(args) -> None:
    companies = {c["company_id"]: c for c in _read_companies(Path(args.companies))}
    out_dir = Path(args.out)
    out_dir.mkdir(parents=True, exist_ok=True)
    written = 0
    for row, sheet in _load_sheets(Path(args.signals)):
        result = score_company(sheet, row.get("company_id", ""), row.get("company_name", ""))
        if result.score < args.min_score:
            continue
        company_row = companies.get(result.company_id, {})
        path = out_dir / f"{result.company_id or result.company_name}.md"
        path.write_text(build_brief(result, sheet, company_row), encoding="utf-8")
        written += 1
    print(f"Wrote {written} briefs to {out_dir} (min score {args.min_score}).")


def main() -> None:
    parser = argparse.ArgumentParser(description="Engineering Digital Opportunity Score pipeline")
    sub = parser.add_subparsers(dest="cmd", required=True)

    p = sub.add_parser("template", help="generate an empty signal sheet to fill in")
    p.add_argument("--companies", default=str(ROOT / "data" / "companies.csv"))
    p.add_argument("--out", default=str(ROOT / "data" / "signals_template.csv"))
    p.set_defaults(func=cmd_template)

    p = sub.add_parser("audit", help="collect website signals (needs network)")
    p.add_argument("--companies", default=str(ROOT / "data" / "companies.csv"))
    p.add_argument("--out", default=str(ROOT / "data" / "audited_signals.csv"))
    p.set_defaults(func=cmd_audit)

    p = sub.add_parser("score", help="score a filled signal sheet")
    p.add_argument("--signals", default=str(ROOT / "data" / "signals.csv"))
    p.add_argument("--out", default=str(ROOT / "data" / "digital_scores.csv"))
    p.add_argument("--explain", type=int, default=0, help="print full derivation for the top N")
    p.set_defaults(func=cmd_score)

    p = sub.add_parser("briefs", help="write one sales brief per qualifying prospect")
    p.add_argument("--signals", default=str(ROOT / "data" / "signals.csv"))
    p.add_argument("--companies", default=str(ROOT / "data" / "companies.csv"))
    p.add_argument("--out", default=str(ROOT / "prospects"))
    p.add_argument("--min-score", type=float, default=60.0)
    p.set_defaults(func=cmd_briefs)

    args = parser.parse_args()
    args.func(args)


if __name__ == "__main__":
    main()
