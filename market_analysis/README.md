# Engineering Digital Services — market validation study

A commercial validation study for a specialist B2B digital-content business serving
engineering, industrial and construction companies in South Africa and the DRC,
plus a working prospect-scoring engine.

**This is a standalone research project.** It has nothing to do with the hydrogen
storage simulation in the rest of this repository — it lives here only because no
dedicated repository exists for it yet. It is entirely self-contained under
`market_analysis/` and can be lifted into its own repo unchanged.

## Start here

**[`reports/00_MAIN_REPORT.md`](reports/00_MAIN_REPORT.md)** — the full study, 30 sections,
10 tables. Read the section titled *"what this study could and could not do"* first: it
states the research limits plainly, and they matter for how much weight each finding carries.

## The verdict in short

Conditional GO on a **reshaped** business:

- **Kill the R4,500/month starter tier** — it is loss-making at any credible delivery standard (§16.2)
- **Lead with a fixed-price one-off**, not a retainer (§14)
- **Minimum retainer R15,000/month**; target tier R25,000
- **AI is a cost lever, never a pitch** (§21.4)
- **Do not build 3D, ML or a platform** (§22, §23)
- **South Africa first**; DRC as a project-story service line sold to SA clients, not a market (§7)
- **Target contractors, mining services and energy — defer manufacturing**, which is contracting (§3)

Everything hinges on the eight-week validation experiment in §26. Three paid pilots and two
retainer conversions is a GO. One or none means the positioning is wrong.

## What is in here

```
market_analysis/
├── reports/00_MAIN_REPORT.md      the study
├── config/scoring_config.json     the scoring rule table - every weight is here, in the open
├── src/
│   ├── signals.py                 the 35 observable facts a score may depend on
│   ├── scoring.py                 the scoring engine + full derivation printer
│   ├── audit.py                   website signal collector (robots-respecting, no LinkedIn)
│   ├── brief.py                   scored prospect -> one-page sales brief
│   └── pipeline.py                CLI: template / audit / score / briefs
├── tests/test_scoring.py          8 tests, all passing
├── data/
│   ├── companies.csv              49 real companies, each traceable to a search result
│   ├── competitors.csv            12 competitors and substitutes
│   ├── sources.csv                27 sources, each graded A-D
│   ├── market_segments.csv        segment ranking with evidence
│   ├── packages.csv               the rate card with costs and margins
│   ├── acquisition_playbook.csv   channels, volumes and POPIA status per channel
│   ├── signals_DEMO.csv           fictional rows proving the pipeline runs
│   └── signals_template.csv       blank sheet for the 49 companies
├── pricing/pricing_benchmarks.csv SA market pricing, sourced
└── prospects/                     generated sales briefs (DEMO rows only so far)
```

## Running the scoring engine

```bash
cd market_analysis
python3 tests/test_scoring.py                                    # 8/8 should pass

python3 src/pipeline.py template --out data/signals.csv          # blank sheet + what each column asks
pip install -r requirements.txt                                  # only needed for the next line
python3 src/pipeline.py audit --out data/audited.csv             # website signals (needs network)
# merge audited.csv into signals.csv, then fill the manual columns by hand
python3 src/pipeline.py score --signals data/signals.csv --explain 5
python3 src/pipeline.py briefs --signals data/signals.csv --min-score 60
```

`template` prints what every column asks and whether it is required. `score` prints a
full line-by-line derivation with `--explain N` — every point traces to one named signal.

## Three things to know before you trust a number in here

1. **No page was ever opened.** The research environment blocked direct page retrieval, so
   every figure comes from a search-result summary. Sources are named and graded A–D in
   `data/sources.csv`. Six specific items to verify before acting are listed at the end of
   the report.
2. **No company has been audited or scored.** Every row in `companies.csv` is
   `audit_status = NOT_AUDITED` and every audit field is empty. The scoring engine has only
   ever been run on clearly-labelled fictional demo rows. Populating it is the first day of work.
3. **The company database is 49, not the 110 requested.** §9 explains exactly where the
   remaining 61 come from — five directory sources, about a day of ordinary browsing.
   Padding the file with invented companies was the alternative and it was not taken.

## Files that answer specific parts of the brief

| You wanted | It is here |
|---|---|
| Market analysis | `reports/00_MAIN_REPORT.md` §1–§12 |
| Business model | §17 (Business Model Canvas) |
| Pricing model | §15, §16 and `data/packages.csv` |
| Sales strategy | §18, §19, §20 and `data/acquisition_playbook.csv` |
| Digital Opportunity Score | §10, `config/scoring_config.json`, `src/` |
| Validation experiment | §26 |
| 90-day launch plan | §28 |
| Go/no-go | §29 |
