# Engineering Digital Services for South African and DRC Industrial SMEs
## A commercial validation study

**Prepared:** 21 August 2026
**Status:** Desk research. Not yet validated against a single paying customer.
**Verdict in one line:** Conditional GO — but not for the business as specified.

---

## READ THIS BEFORE THE EXECUTIVE SUMMARY: what this study could and could not do

The brief asked for real market analysis, real companies, real prices, and no fabrication. Three limits shaped what came back, and they change how much weight each finding can carry.

**1. Only search was available, not page retrieval.** The research environment blocks direct fetching of web pages. Every claim below therefore rests on search-engine result summaries, not on pages I opened and read. Where a figure is quoted, the source is named and graded in `data/sources.csv` on an A–D scale. Nothing was verified by opening a company website, a LinkedIn page, or a pricing page.

**2. No company was digitally audited.** The brief asked for a website and social audit of each prospect. That is not possible without page retrieval. I did not guess at it. Every company in `data/companies.csv` carries `audit_status = NOT_AUDITED`, and every digital-audit field is empty. The Digital Opportunity Score in section 10 is built and tested and runs, but it has been run only on clearly-labelled fictional demo rows. **No real company in this study has a score.** Producing scores from search snippets would have been invention dressed as analysis.

**3. The company database is 49 companies, not the 110 requested.** Every one is traceable to a specific search result recorded in the CSV. Padding it to 110 would have meant inventing names. Section 9 explains where the other 61 come from and how long it takes to get them.

What this study *can* do is answer the commercial question — is there a business here, at what price, for whom, and what would kill it — and hand over a working scoring and prospecting engine. What it cannot do is hand over a ranked, audited prospect list. That is the first week of work, not a research output.

---

## EXECUTIVE SUMMARY

**The business as specified is weakly differentiated and priced to fail. The business underneath it is viable.**

Five findings drive that.

**The starter package is priced into the freelancer band and would define the company.** The proposed R4,500–R6,000/month sits inside the R2,500–R8,000 band that South African freelance social media managers occupy (S01). Boutique agencies of two to five people occupy R8,000–R20,000. A specialist entering below the generalist floor is not read as a specialist. It is read as a cheap freelancer with an engineering hobby — and it attracts the clients who churn fastest. **Recommendation: kill the R4,500 tier outright.** Minimum viable retainer R15,000.

**AI is a margin lever, not a value proposition, and saying so out loud is a liability.** Reported B2B buyer behaviour has moved against visible AI: 94% of B2B buyers say they fact-check AI research outputs, and the share distrusting online resources rose from 39% to 47% in a year (S15). One widely-repeated figure claims 46% trust a brand less on learning AI was used where they assumed human work (S16, weak source, treat as directional only). Meanwhile the client can run the same models for near-zero marginal cost. **AI belongs in the cost model and nowhere in the pitch.**

**3D and immersive web should not be built now.** Three.js was detected on roughly 3,585 active domains worldwide in March 2025 (S17). Even allowing for heavy undercounting by detection tooling, that is a rounding error against the global web. No evidence of B2B conversion lift from WebGL sites surfaced in any search. Meanwhile South African 3D studios already sell a still render for R2,500–R10,000 (S06) — the visual outcome an industrial client actually wants, at a fraction of a WebGL build. **3D is a later-stage premium add-on. Building it first burns the runway on the least-proven pillar.**

**Manufacturing is the wrong first vertical; infrastructure, mining services and energy are the right ones.** South African manufacturing fell 0.8% in Q1 2026, its second consecutive year of negative growth, with production down 2.9% in April 2026 (S21). Against that, construction is forecast to grow 2.8% in real terms in 2026 (S07), against R1.06 trillion of committed public infrastructure spend over the 2026–2029 MTEF (S08), and the renewable programme implies sustained EPC demand (S25). **Sell to the sectors with money arriving, not the sector with a marketing gap.**

**South Africa first, decisively. DRC is not a second market — it is a service line.** LinkedIn reaches 17.0 million members in South Africa, 37.8% of adults (S13). In the DRC it reaches 980,000, 0.9% of the population, against 30.5% internet penetration and 9.2% social media penetration (S14). Add FX repatriation controls, a presidential audit of the mining revenue chain, and a business environment Coface characterises as constrained by endemic corruption (S23). Selling monthly retainers to Congolese SMEs is a bad first business. Selling to South African and international firms *operating in* the DRC — billed in ZAR or USD from South Africa — is a real one, and DRC copper output is forecast to rise 6% in 2026 (S22).

**What to build instead.** A productised, trigger-driven *project story* offer sold to CIDB Grade 7–9 contractors, mining-services firms and EPC contractors in the month after they win something. One-off first (R18,000–R35,000), retainer second (R15,000 / R25,000 / R40,000). No platform, no ML, no 3D, no SaaS. The differentiator is not AI and not 3D: it is that the person writing the case study can read the drawing.

**The single biggest reason a prospect says no** is not price and not scepticism about marketing. It is: *"we already get all our work through relationships and tenders — what does this change?"* That objection is answered by tying the work to a transaction they already fund (prequalification, capability statements, tender annexures, client presentations), not by promising leads. Sell into an existing budget line. Do not try to create a new one.

**Go/no-go decision rule.** Contact 50 qualified, triggered prospects over eight weeks. Three paid pilots at R18,000 or above, and two converting to a retainer of R15,000 or above within 60 days, is a GO. Fewer than two paid pilots is a NO-GO on this positioning — and the study sets out what to test next in that case.

---

## 1. BUSINESS CONCEPT

### 1.1 What is actually being proposed

Stripped of the framing, the proposal is a specialist B2B content and digital-experience agency, differentiated on three claims: sector knowledge (the founder is an engineer), production economics (AI-assisted), and technical capability (3D, analytics, eventually ML).

Each claim needs testing separately, because they are not equally strong.

| Claim | Verdict | Why |
|---|---|---|
| Sector knowledge as differentiator | **Strong, and the only durable one** | An engineer can interview a project manager, read a drawing, and write a case study that survives technical review. A generalist agency cannot, and cannot cheaply hire it. But note: CubicICE claims 30+ years in exactly this space (C01), so "specialist" is not unoccupied ground. |
| AI production economics | **Real but temporary and not sellable** | It lowers cost. It does not raise price. Competitors get the same tools next quarter, and the client can use them directly (C09). |
| 3D / immersive capability | **Weak as a demand driver, useful as a door-opener** | No demand evidence found (S17). Useful in a pitch as proof of technical range; dangerous as a product line. |

### 1.2 Positioning options, evaluated

The brief offered five candidate positionings. Assessed against what the buyer is actually willing to fund:

| Candidate | Assessment |
|---|---|
| Engineering Digital Growth & Experience | Two abstractions stacked. Neither maps to a budget line. **Reject.** |
| Engineering Digital Content & Experience | "Content" is the word that anchors price to the R6,000–R25,000 social media band (S01, S03). Naming yourself after the commodity prices you as the commodity. **Reject.** |
| Engineering Digital Growth Studio | "Studio" signals creative shop. Puts you alongside 273+ SA digital agencies (S20) with no reason to be chosen. **Reject.** |
| Engineering Marketing & Digital Experience | Contains the exact word the target buyer has already decided he does not need. **Reject.** |
| **Engineering Digital Authority** | Strongest of the five. "Authority" maps to credibility and prequalification, which is closer to something an engineering MD already values. Still abstract. **Closest, but not sufficient.** |

**Recommendation.** None of the five is the answer, because all five name a *capability*. The buyer funds *outcomes tied to transactions*. The category to claim is **business development content for engineering and construction** — or, in the buyer's own language, *"we turn the work you have already done into the material your business development team needs."*

The trading name can be whatever you like. The **category** must be one the buyer already budgets for. Marketing is not one. Business development, tendering, and capability presentation are.

### 1.3 The two proposed positioning statements, assessed

> *"We help engineering and industrial companies transform their technical expertise, projects and capabilities into powerful digital content, immersive experiences and data-driven marketing systems that attract the right customers and generate measurable business opportunities."*

**Reject.** It is three products in one sentence, it promises measurable business opportunities you cannot yet evidence, and "immersive experiences" attaches the offer to the least-proven pillar. It also fails the room test: an MD of a Grade 8 contractor does not finish this sentence.

> *"We make engineering expertise visible, understandable and commercially valuable."*

**Keep, with one change.** It is short, it is true, and it is about the client rather than the toolkit. "Commercially valuable" is the load-bearing phrase and it is the one you must be able to defend. Until you have a case study, soften it to something you can prove:

> **"We turn the work you have already done into the material that wins the next job."**

That sentence names the asset (past work), the output (material), and the outcome (the next job) — and every part of it is defensible from day one.

---

## 2. MARKET PROBLEM

### 2.1 The problem that is real

South African engineering and industrial SMEs hold genuine technical evidence — completed projects, solved problems, unusual methods, named blue-chip clients — and almost none of it is in a form a new buyer can assess. The material exists as site photographs on a project manager's phone, method statements in a tender folder, and knowledge in the heads of three senior people.

This matters commercially for a specific reason, and it is not "visibility". It is that **the buyer's evaluation now happens before contact.** Reported B2B buying behaviour shows peer recommendation rated above vendor websites as a trust signal, and 53% of buyers speaking to a peer during the process (S15). A firm whose only credibility asset is a referral is fine until the referral chain does not reach the decision-maker. Then there is nothing to fall back on.

### 2.2 The problem that is not real

**"Engineering SMEs need more social media."** They do not, and framing it that way is why most agencies fail in this segment. A Grade 7 contractor does not win a R40m municipal contract from LinkedIn. What he does need is to survive a prequalification review, present convincingly to a client's technical committee, and be findable and credible when a procurement officer checks him out.

The gap between those two framings is the entire business.

### 2.3 Why now

Three timing arguments, in descending order of strength:

1. **Committed infrastructure spend.** R1.06 trillion over the 2026–2029 MTEF (S08), split R577.4bn to state-owned companies, R217.8bn to provinces, R205.7bn to municipalities. Construction forecast +2.8% real in 2026 (S07). Money arriving creates competition for it, and competition for it creates demand for credibility.
2. **Energy and mining capex.** The IRP target of 26GW of new renewables by 2030 (S25, verify against the gazetted IRP) implies sustained EPC contracting. DRC copper +6% in 2026 (S22) pulls South African mining-services firms northward.
3. **A trust dislocation that favours specialists.** As generic content becomes free to produce, verifiable technical specificity becomes the scarce signal (S15). A firm that can publish something only an engineer could have written is differentiated by construction.

**Counter-argument that must be held.** None of the above proves anyone will pay *you*. Sector growth raises the number of firms who *could* buy; it says nothing about conversion. This is precisely the confusion the brief warned against, and it is the reason section 26 exists.

---

## 3. TARGET CUSTOMER

### 3.1 The hypothesis under test

> *"Successful but digitally underdeveloped engineering SMEs may be the best initial customer segment."*

**Partly supported, and it needs one correction.** "Successful but digitally underdeveloped" describes an enormous number of firms, most of whom will never buy. The missing variable is **motive**. A successful, digitally weak firm with no trigger and no history of spending on marketing is not a prospect; it is a firm that has decided, rationally, that it does not need this. Its digital gap is a *consequence* of that decision, not an opportunity.

The corrected hypothesis:

> **Successful, digitally underdeveloped engineering firms become buyable in the window immediately after a trigger event — a contract award, a market entry, a facility opening, a recruitment drive, or a major tender in preparation.**

This correction is built into the scoring engine as the `intent_gate` modifier (section 10), which discounts any company showing neither a trigger nor any prior evidence of marketing spend by a factor of 0.6.

### 3.2 Segments, ranked

**TABLE 1 — Target market segments**

| Rank | Segment | Why it ranks here | Evidence | Ability to pay | Verdict |
|---|---|---|---|---|---|
| 1 | **CIDB Grade 7–9 contractors and civil/structural contractors** | Grade 7 tenders to R60m, Grade 8 to R200m, Grade 9 unlimited (S12). Prequalification and capability presentation are existing, funded activities. Construction growing 2.8% in 2026 (S07) against R1.06trn committed spend (S08). | S07, S08, S11, S12 | High | **First target** |
| 2 | **Mining services, mining equipment and EPCM contractors** | Sell to sophisticated procurement functions; capability evidence is contractually relevant. MEMSA exists as a member-list prospecting source (S27). DRC copper +6% pulls SA firms north (S22). | S22, S27 | High | **First target** |
| 3 | **Renewable energy EPC and IPP-facing engineering firms** | Bid-driven sector; credibility material is directly usable in bid documents. IRP implies ~6GW/yr deployment (S25). | S25 | High | **First target** |
| 4 | **Consulting engineering firms (CESA member scale)** | 580+ member firms employing ~19,000 (S10). Professional-services firms understand that reputation is the product, which lowers the "we are engineers not marketers" objection. Partner-led decisions are slow. | S10 | Medium-High | **Second wave** |
| 5 | **Industrial automation and systems integrators** | Genuinely complex offerings that are badly explained — the strongest *technical storytelling* fit of any segment. But firms are small and budgets thin. | Search evidence, 6 firms identified | Medium | **Second wave** |
| 6 | **Metals and engineering manufacturers (SEIFSA universe)** | 1,300+ member companies, 170,000+ employees (S09) — the largest identified universe. But manufacturing contracted 0.8% in Q1 2026 and production fell 2.9% in April 2026 (S21). A shrinking sector cuts discretionary spend first. | S09, S21 | Low-Medium **now** | **Defer** |
| 7 | **Micro contractors (CIDB Grade 1–4)** | Most of the 120,000+ CIDB register sits in the lowest grades (S11) and these are micro businesses. | S11 | Very low | **Exclude** |
| 8 | **DRC-domiciled SMEs** | LinkedIn 0.9% population reach, 9.2% social penetration (S14); FX and compliance friction (S23). | S14, S23 | Low + high friction | **Exclude for now** — see section 7 |

### 3.3 The buying profile to look for

Not "engineering company". This:

- CIDB Grade 7–9, **or** 40–250 employees, **or** a named flagship project above R20m
- A trigger event in the last six months with a public evidence link
- Some existing evidence that marketing is considered legitimate — a trade show stand, a press release, a site rebuilt in the last two years, a marketing coordinator on LinkedIn
- A reachable decision-maker: owner-MD, or a business development / commercial manager
- Serving clients who run formal procurement (mines, municipalities, utilities, listed corporates) rather than word-of-mouth private clients

The fourth and fifth points do more work than the digital gap does.

---

## 4. CUSTOMER PSYCHOLOGY

### 4.1 The objections, and which are actually hard

The brief listed eight beliefs the target market may hold. They are not equally difficult.

| Belief | Difficulty | How it is actually handled |
|---|---|---|
| "We get business through relationships and referrals." | **Hardest** | Do not dispute it — it is true and it has worked. Reframe: the material is for the moments the relationship does not reach. Prequalification. A new client's technical committee. A procurement officer who has never met you. |
| "We already have customers." | Hard | Same reframe. Ask what happens when the three people who bring in the work retire or leave. This is a real, felt risk in owner-managed SA engineering firms. |
| "Our projects speak for themselves." | Medium | They do — to people who saw them. Ask him to show you the project. He will reach for his phone. That is the demonstration. |
| "We are engineers, not marketers." | Medium | Agree completely, then say you are not selling marketing — you are selling capability material. The objection dissolves when the category changes. |
| "We prefer spending on projects and equipment." | Medium | Correct capital allocation logic. Answer with a one-off project-scale purchase, not a retainer. This is a structural argument for leading with a fixed-price piece of work. |
| "Marketing is unnecessary." | Low | This person is not a prospect. Do not spend the meeting. |
| "Our reputation is enough." | Low | Usually a variant of the referral objection. |
| "We don't need social media." | Lowest | Agree. You are not selling social media. |

### 4.2 Which value arguments actually land

The brief listed twelve. Ranked by how well each survives contact with an engineering MD who is already busy and already profitable:

**Tier 1 — lead with these**
1. **Supporting business development and tenders.** Ties to an existing budget line. Strongest argument available.
2. **Communicating capability to decision-makers who have never met you.** Concrete, and the referral objection does not block it.
3. **Reducing dependence on a handful of relationship-holders.** Names a real succession risk owner-managers feel.

**Tier 2 — supporting**
4. **Attracting technical talent.** Engineering firms in South Africa compete hard for scarce skills; recruitment content has a visible, near-term payoff, which makes it an unusually easy first sale.
5. **Communicating major projects.** Easy to demonstrate. Naturally trigger-linked.
6. **Building measurable digital assets.** Appeals to the engineer's instinct for measurement.

**Tier 3 — do not lead with these**
7. Generating qualified leads — you cannot yet evidence it, and overpromising it is the fastest route to a lost client and a bad reference.
8. Entering new markets, investor/partner communication, differentiation, customer understanding, digital authority, technical demonstration — all true, all abstract, none of them a reason to sign this month.

**The honest position on lead generation.** Do not promise leads until you have produced them. Promise better material and clearer measurement, deliver both, and let the second contract be the one that talks about pipeline.

---

## 5. MARKET SIZE / MARKET OPPORTUNITY

Building this bottom-up rather than quoting a sector total, because sector totals do not tell you how many firms will pay you.

**Identified universes (each independently sourced):**

| Universe | Size | Source | Grade |
|---|---|---|---|
| CIDB-registered contractors (all grades) | >120,000 | S11 | A |
| SEIFSA member companies (metals & engineering) | 1,300+ | S09 | A |
| CESA member consulting engineering firms | 580+ | S10 | A |
| Formal SMMEs in South Africa (all sectors) | ~250,000 | S26 (2019) | B, dated |

**Narrowing to a payable universe.** The following chain is an *estimate*, and each step is labelled. It is not a measured figure.

| Step | Assumption | Basis | Running total |
|---|---|---|---|
| CIDB registered contractors | 120,000 | S11 (verified) | 120,000 |
| Grade 5+ (excludes the micro-business bulk) | ~8% | **ESTIMATE.** Historic CIDB data showed >50,000 of 55,000 registrations in the lowest four grades in 2007 (search evidence). The grade-level breakdown for 2025 could not be obtained. | ~9,600 |
| Plus engineering, manufacturing, mining-services, automation and EPC firms of comparable scale | +3,000 | **ESTIMATE** derived from SEIFSA 1,300 + CESA 580 + unassociated firms | ~12,600 |
| Firms of a scale that could fund R15,000+/month | ~35% | **ESTIMATE** | ~4,400 |
| Firms in a trigger window in any given year | ~25% | **ESTIMATE** | ~1,100/yr |
| Firms that would consider an external supplier at all | ~30% | **ESTIMATE** | **~330/yr** |

**Read this number correctly.** Roughly 330 realistically approachable, triggered, payable South African prospects per year is not a small market for a solo founder or a team of three — it is roughly 30 times more prospects than a single operator can serve. It is a *hopeless* market for a venture-scale business. That asymmetry is the most important number in this report, and it drives the recommendation in section 22 against building a platform.

**What the number does not prove.** Four of the six steps above are estimates with no source. Treat the figure as an order of magnitude that justifies a validation experiment, not as a market size you could put in front of an investor.

---

## 6. SOUTH AFRICA ANALYSIS

**Demand-side conditions: favourable, unevenly.**

| Factor | Reading | Source |
|---|---|---|
| Construction | Growing. +2.8% real 2026; CAGR 3.9% to 2030 | S07 |
| Public infrastructure | R1.06trn committed 2026–2029 MTEF | S08 |
| Manufacturing | **Contracting.** −0.8% Q1 2026, second year of negative growth, production −2.9% April 2026 | S21 |
| Mining / energy | Expanding; REIPPPP pipeline sustained | S25 |
| LinkedIn reach | 17.0m members, 37.8% of adults | S13 |

**The manufacturing figure is the most commercially important line in this table.** It is the segment with the largest identified universe (SEIFSA, 1,300+ firms) and the most obvious digital gap — and it is the segment least able to fund discretionary spend right now. Choosing it because the gap is big would be exactly the error the scoring engine's intent gate is designed to prevent.

**Supply-side conditions: crowded, and the specialist ground is occupied.**

GoodFirms alone lists 273 South African digital marketing agencies (S20) — a lower bound. More importantly, at least five agencies already claim the industrial/engineering B2B position, one of them (CubicICE) claiming over 30 years in it (C01–C05). **"Specialist industrial marketing agency" is not an empty category in South Africa.** Any differentiation claim has to be sharper than "we understand engineering".

**Regulatory constraint that changes the acquisition strategy.** POPIA section 69 requires opt-in consent for unsolicited electronic direct marketing to natural persons, and buying, renting or scraping contact lists is not permitted (S19). Practitioner commentary suggests role-based addresses aimed at the legal entity sit differently, but that is interpretation, not settled law. **Practical effect: the cold-email prospecting engine implied by the brief is not lawfully available in its obvious form.** Section 20 rebuilds acquisition around LinkedIn, telephone, trade events and referral instead. Get legal advice before any outbound email programme.

---

## 7. DRC ANALYSIS

**Do not enter the DRC as a second SME market. Enter it as a service line for clients you already have.**

| Factor | South Africa | DRC | Source |
|---|---|---|---|
| Internet penetration | High | 30.5% (34.7m users) | S14 |
| Social media penetration | High | 9.2% (10.4m identities) | S14 |
| LinkedIn reach | 17.0m members, 26.2% of population | 980,000 members, 0.9% of population | S13, S14 |
| Mobile connections | High | 64.7m, 56.9% of population | S14 |
| Business language | English | French (plus Lingala, Swahili) | Search evidence |
| Payment environment | Normal | FX repatriation under presidential audit; compliance-heavy transactions | S23 |
| Country risk | Moderate | Constrained by endemic corruption and security tensions (Coface) | S23 |
| Sector momentum | Mixed | **Strong** — copper output +6% forecast 2026 | S22 |

**The case against selling to Congolese SMEs directly.** A LinkedIn audience of 0.9% of the population removes the primary channel the entire service model depends on. The delivery language is French, which you would have to buy in. Payment carries FX and compliance friction that a small supplier is badly placed to absorb. Local incumbents already hold the relationships (C12). Every one of these is individually survivable; together, as a *first* market, they are not.

**The case for the DRC as a service line.** The mining expansion is real and it is drawing South African and international engineering, EPCM and contracting firms north — MES Holdings has operated EPCM in the DRC since 2010 with facilities in Lubumbashi and Kolwezi (CD-ENG-001). Those firms are South African-facing buyers with South African payment terms, and their DRC work is exactly the kind of high-value project story that is hardest for them to tell and most valuable to tell. DRC Mining Week in Lubumbashi each June is a concentrated prospecting event for that population.

**Recommendation.** Sell *DRC project stories* to South African clients. Do not open a Kinshasa sales effort. Revisit no earlier than month 18, and only if a client pulls you there.

---

## 8. COMPETITOR ANALYSIS

Full detail in `data/competitors.csv`. All competitor evidence is grade C — search summaries only, no site was opened, no pricing page was read.

**TABLE 2 — South African competitor landscape**

| # | Competitor | Type | Positioning claim | Threat |
|---|---|---|---|---|
| C01 | CubicICE | Direct specialist | B2B and industrial marketing, 30+ years, mining/manufacturing/construction/engineering across sub-Saharan Africa | **High** |
| C02 | Shift ONE Digital | Direct specialist | B2B marketing for growing manufacturing, construction and engineering brands | **High** |
| C03 | Famous Digital Media | Direct specialist | B2B digital marketing since 2015 for engineering, construction, energy, oil & gas | Medium-High |
| C04 | Digitlab | Generalist with industrial vertical | Understands long, complex industrial sales cycles | Medium |
| C05 | Xponent | Direct specialist | B2B packages for engineering, science, technology, manufacturing; lead-gen focus | Medium |
| C06 | 273+ generalist SA agencies | Price anchor | Full-service digital | **High** (sets buyer price expectation at R6k–R25k) |
| C07 | Freelancers | Price floor | Affordable social media | **High** (R2,500–R8,000/month) |
| C08 | In-house marketing hire | Substitute | Internal capability | Medium-High |
| C09 | Client uses AI directly | Disintermediation | Do it ourselves | **High** |
| C10 | SA video production houses | Adjacent specialist | Corporate video | Medium |
| C11 | SA 3D visualisation studios | Adjacent specialist | Renders and animation from R2,500 | Medium |
| C12 | DRC agencies (Kinshasa Digital Marketing, IBORA MEDIA, Congo Web Agency, 1FLUENCE) | Local incumbent | Local digital and communications | Medium (DRC only) |

### 8.1 Differentiation verdict: **moderately differentiated, and only on one axis**

Honest assessment against the four options in the brief:

- Not *highly differentiated*. At least five agencies already claim the industrial B2B position, one with three decades of relationships.
- Not *weakly differentiated* or *commoditised* either, because of one thing none of the incumbents can cheaply replicate: **a founder who can read the drawing.**

The defensible claim is narrow and it is this: *an agency can describe your project; an engineer can explain why it was difficult.* That difference shows up in the artefact, it survives a technical review by the client's own engineers, and it cannot be bought by an agency at junior-hire rates.

**What is not defensible:** AI production (C09 erases it), 3D capability (C11 already sells the visual outcome cheaper), "we understand engineering" (C01–C05 all say it), and price (C07 will always be lower).

**Strategic implication.** Do not compete on breadth of services. Compete on the depth of a single artefact — the engineering project case study — and let everything else be a follow-on sale.

---

## 9. TARGET COMPANY DATABASE

**Delivered: 49 companies. Requested: 110. This is a shortfall and it is stated as one.**

| Requested | Delivered | File / table_group |
|---|---|---|
| 30 SA engineering/industrial SMEs | 14 | `sa_engineering_sme` |
| 20 SA contractors/construction SMEs | 14 | `sa_contractors` |
| 20 SA medium engineering/industrial | 12 | `sa_medium_engineering` |
| 20 DRC engineering/industrial SMEs | 9 (combined) | `drc_companies` |
| 20 DRC contractors/industrial | — | |

**Why.** Every company in the file is traceable to a specific search result recorded against a `source_id`. Getting from 49 to 110 requires the member directories that could not be opened in this environment — the CIDB register (`registers.cidb.org.za`), MEMSA's member list, CESA's member list, SEIFSA's association lists, and exhibitor lists from Electra Mining and DRC Mining Week. Those five sources will yield well over 110 qualified names in a day of ordinary browsing. Inventing the remaining 61 was the only alternative, and it was not taken.

**What each row does and does not contain.** Identity fields (name, country, location, sector, and where seen, website or LinkedIn) come from search results and carry an evidence grade. Size bands are all marked `ESTIMATED_UNVERIFIED` because no employee count was verified against a primary source. Every digital-audit field is empty and every row is marked `audit_status = NOT_AUDITED`.

**TABLE 3 — South African engineering/industrial SMEs (extract; 14 rows in `data/companies.csv`)**

| ID | Company | Location | Sub-sector |
|---|---|---|---|
| SA-ENG-001 | Systems Automation & Management (SAM) | Bryanston, JHB | Systems integration, PLC/SCADA/DCS |
| SA-ENG-002 | Vertex Automation | Gauteng | Conveyors, robotics, automated manufacturing |
| SA-ENG-003 | PCMP | Roodepoort | Systems integration |
| SA-ENG-004 | AGE Technologies | South Africa | PLC programming, SCADA |
| SA-ENG-005 | CraigCor | South Africa | Automation, control, smart metering |
| SA-ENG-006 | Am Systems Integrations | Boksburg | Industrial control, LV systems |
| SA-ENG-012 | SDMM Engineering | Evander, Mpumalanga | Steel fabrication, civils, machining |
| SA-ENG-013 | B&W Instrumentation and Electrical | South Africa | E&I contracting |
| SA-ENG-015 | Greenpower Energy | South Africa | Solar EPC |
| SA-ENG-016 | RenewEPC | South Africa | Utility-scale solar PV, BESS, wind EPC-M |
| SA-ENG-017 | Solar EPC | South Africa | EPC to IPP developers (REIPPPP) |
| SA-ENG-018 | Keon Consulting Engineers | Gqeberha | Civil and structural consulting |
| SA-ENG-020 | Tshedza Consulting Engineers | South Africa | Civil consulting |
| SA-ENG-022 | ROMH Consulting Engineers | South Africa | Consulting engineers |

**TABLE 4 — South African contractors (extract; 14 rows)**

| ID | Company | Location | Note from source |
|---|---|---|---|
| SA-CON-001 | Trencon Construction | South Africa | 100% black-owned; CIDB 9GB/9CE; 600+ staff |
| SA-CON-002 | Temi Construction | South Africa | Est. 2010; CIDB 9 GBPE, 8 CEPE |
| SA-CON-003 | Ruwacon | South Africa | 51% black ownership; CIDB 9GBPE |
| SA-CON-004 | WCB Construction | Western Cape | CIDB 8CE/8GB; largest 100% black youth-owned firm in WC |
| SA-CON-005 | Spec Africa | Rustenburg | Construction, civil, electrical, security, fencing |
| SA-CON-006 | Bakgaditse Group | Rustenburg | Electrical engineering, installations, compliance |
| SA-CON-008 | Platchro Mining Services | Rustenburg | One-stop mining contracting, est. 2004 |
| SA-CON-010 | Psitron Electrical | Richards Bay | 22-year electrical business |
| SA-CON-012 | Alsandro | South Africa | E&M, pipelines, earthworks, waste |
| SA-CON-013 | Greenline Projects | Southern Africa | Energy alternatives, sustainable building |

*(Remaining rows in the CSV.)*

**TABLE 5 — Medium-sized SA engineering/industrial companies (extract; 12 rows)**

| ID | Company | Sub-sector | Note from source |
|---|---|---|---|
| SA-ENG-007 | 4Sight OT Automation | Automation & electrical engineering | 25+ years system integration |
| SA-ENG-008 | MechProTech (MPT) | Mineral processing equipment | Designer and supplier |
| SA-ENG-009 | IMS Engineering | Mining equipment | Crushers, sorting technology |
| SA-ENG-010 | GHH Mining Machines | Mining equipment | Trackless mobile machines, Boksburg |
| SA-ENG-011 | Tecman | Mining equipment | Rock breaker boom systems |
| SA-ENG-014 | DGC Africa | Mechanical engineering services | Sub-Saharan service delivery |
| SA-ENG-019 | Nyeleti Consulting | Consulting engineering | Structural, water, transportation |
| SA-ENG-021 | Ndodana Consulting Engineers | Consulting engineering | BEE L1; operating since 1994 |
| SA-ENG-023 | MBSA Consulting | Consulting engineering | Civil, structural, electrical; since 1999 |
| SA-ENG-024 | LTE Consulting | Consultancy and advisory | Fully black-owned |
| SA-ENG-025 | GIBB | Multi-disciplinary consulting | Large firm; 67% black ownership |

**TABLE 6 — DRC target companies (9 rows)**

| ID | Company | Location | Sub-sector | Note from source |
|---|---|---|---|---|
| CD-ENG-001 | Mining Engineering Services (MES Holdings) | Lubumbashi, Kolwezi | Mining EPCM | Vinmart Group; EPCM in DRC since 2010 |
| CD-ENG-002 | Entreprise Générale Malta Forrest (EGMF) | Lubumbashi + 4 offices | Civils, roads, precast | Forrest Group |
| CD-ENG-003 | METALCO | Lubumbashi | Steel construction | Est. 1991 |
| CD-ENG-004 | Edile Construction | Lubumbashi | Building construction | Commercial, industrial, institutional |
| CD-ENG-005 | Maisons Super Development | Lubumbashi | Civil engineering | Directory listing only |
| CD-ENG-006 | Sisimizi | Lubumbashi | Civils, architecture, design | Directory listing only |
| CD-ENG-007 | VSi Afrique | Kinshasa | Civil engineering | Directory listing only |
| CD-ENG-008 | Adi-Construct | DRC | Civil engineering | Directory listing only |
| CD-ENG-009 | Benco | DRC | Civil engineering | Directory listing only |

Note the evidence quality falls off sharply for DRC rows — five of nine are directory listings with nothing beyond a name and a category. This is itself a finding about the DRC market: even basic company intelligence is expensive to obtain, which raises the cost of every sale.

---

## 10. ENGINEERING DIGITAL OPPORTUNITY SCORE (EDOS)

Implemented and tested in `src/scoring.py`, configured in `config/scoring_config.json`, signal definitions in `src/signals.py`, 8 passing tests in `tests/test_scoring.py`.

### 10.1 The change made to the proposed framework

The brief proposed weighting the digital gap most heavily — 15 points for digital presence gap, 10 each for content, visual and lead-generation gaps, 55 of 100 for gap alone.

**That design selects for the wrong companies.** Under it, the highest-scoring company in South Africa is a profitable, well-run firm with no website, no LinkedIn page, no marketing person and no interest in acquiring any of them. Its gap is total. Its purchase probability is near zero. Its gap is not an opportunity — it is the *result* of a deliberate and so far successful decision.

The engine therefore splits 100 points three ways:

| Group | Points | Question it answers |
|---|---|---|
| **Capacity** | 30 | Can they pay R15k–R40k/month or R25k+ for a project without a board decision? |
| **Motive** | 30 | Is there a reason to act *now*? |
| **Gap** | 40 | What could we actually add? |
| *Bonus: 3D/immersive fit* | *+4 max* | *Deliberately small — see 10.4* |

Plus three multiplicative modifiers, of which one matters:

**`intent_gate` (×0.6)** — applied when a company shows *neither* a trigger event *nor* any evidence of prior marketing intent. This single rule is the difference between a prospect list and a list of companies that will never return your call.

### 10.2 Dimensions and points

**TABLE 7 — Digital Opportunity Score methodology**

| Group | Dimension | Max | Driven by |
|---|---|---|---|
| Capacity | Financial capacity | 12 | CIDB grade, headcount, multi-site operations |
| Capacity | Portfolio quality | 10 | Named blue-chip clients, flagship project value |
| Capacity | Organisational readiness | 8 | Marketing/comms person, BD manager, decisive owner |
| Motive | Trigger event | 12 | Trigger type × recency decay (fresh = full value, 18 months = 40%) |
| Motive | Growth signals | 8 | Open vacancies, observed headcount growth |
| Motive | Competitive pressure | 5 | Count of competitors already publishing well |
| Motive | **Marketing intent** | 5 | Paid ads, trade shows, press releases, recent site rebuild |
| Gap | Website gap | 12 | Exists, responsive, HTTPS, staleness, thinness |
| Gap | Content cadence gap | 8 | LinkedIn posts in last 90 days |
| Gap | Visual quality gap | 7 | Rated 1–5 by eye |
| Gap | Storytelling gap | 8 | Case study count, project photography quality |
| Gap | Lead capture gap | 5 | Enquiry form, clear CTA, analytics installed |
| Bonus | 3D/immersive fit | 4 | Physical product or plant worth visualising; configurable equipment |

Two rules inside the table are worth calling out because they encode findings rather than preferences:

- **`website_exists = false` scores 6 of 12, not 12.** No website at all usually means no intent, not maximum opportunity.
- **`linkedin_posts_last_90_days` peaks at 1–2 posts, not 0.** A page posting once a quarter is the ideal prospect: somebody owns it, somebody believes in it, and nobody has time. A page that has never posted is a page nobody owns.

### 10.3 Score bands, and a warning about them

**TABLE 7b — Band interpretation**

| Score | Tier | Label | Action |
|---|---|---|---|
| 75–100 | A | Very high priority | Build a custom sample before contact. Personal approach. |
| 60–74 | B | High priority | Personalised outreach with a mini digital audit. |
| 45–59 | C | Medium | Nurture. Contact when a trigger appears. |
| 30–44 | D | Low | Monitor only. |
| 0–29 | E | Deprioritise | Do not spend time here. |

The brief proposed 80/65/50/35. Those were lowered because the multiplicative modifiers compress the distribution — a gated company loses 40% of its score, which pushes genuinely-mediocre prospects below any threshold set at 50.

**The warning.** These bands are **ordinal, not predictive.** They rank prospects against each other. They do not forecast conversion, and no one should treat a score of 78 as a probability of anything. Recalibrate after 50 audited companies and 20 outreach outcomes by checking which bands actually produced meetings. That recalibration step is written into the validation experiment in section 26.

Every score also carries a **completeness ratio** — required signals observed ÷ required signals. Below 0.6 the engine marks the score `actionable = false` and the brief generator prints a warning. A confident number derived from four observations is worse than no number.

### 10.4 Why the 3D bonus is capped at 4 points

Because the demand evidence does not exist. Three.js was detected on roughly 3,585 active domains globally in March 2025 (S17). Detection undercounts, but even at ten times that figure the global installed base is negligible, and no search returned conversion or lead-generation evidence for B2B 3D sites. A scoring system that awarded 5–10 points for "3D opportunity" would be encoding an assumption as a finding. Four points, additive, capped.

### 10.5 Running it

```bash
python3 src/pipeline.py template --out data/signals.csv   # blank sheet + what each column asks
python3 src/pipeline.py audit --out data/audited.csv      # website signals (needs network)
# merge audited.csv columns into signals.csv, fill the manual ones by hand
python3 src/pipeline.py score --signals data/signals.csv --explain 5
python3 src/pipeline.py briefs --signals data/signals.csv --min-score 60
```

`audit` fetches homepages only, honours `robots.txt`, identifies itself in the User-Agent, and waits two seconds between requests. **It never touches LinkedIn** — LinkedIn's terms forbid automated collection and it blocks it in any case. LinkedIn signals are counted by hand. This is a design decision, not an oversight: a prospecting tool that gets your account restricted is worse than no tool.

---

## 11. TOP 20 PROSPECTS

**There is no scored top 20, and producing one would be fabrication.**

Ranking prospects requires the audit data described in section 10, and no company in this study has been audited. What follows is a **priority audit queue** — 20 candidates selected by segment logic from section 3, ordered by how likely they are to score well once audited. Each carries a hypothesis about why, and each hypothesis is falsifiable in about fifteen minutes of looking.

| # | ID | Company | Segment | Hypothesis to test in the audit |
|---|---|---|---|---|
| 1 | SA-CON-002 | Temi Construction | Grade 9/8 contractor | High capacity (CIDB 9 GBPE); test whether project storytelling matches the grade |
| 2 | SA-CON-001 | Trencon Construction | Grade 9 contractor | 600+ staff implies capacity and a marketing owner; test cadence and case studies |
| 3 | SA-CON-003 | Ruwacon | Grade 9 contractor | Same as above |
| 4 | SA-CON-004 | WCB Construction | Grade 8, Western Cape | Younger firm, growth narrative, likely thin content — strong fit if a trigger exists |
| 5 | SA-ENG-016 | RenewEPC | Renewable EPC-M | Bid-driven sector; capability material directly usable in bids |
| 6 | SA-ENG-017 | Solar EPC | REIPPPP EPC | Same; test whether REIPPPP round activity is a live trigger |
| 7 | SA-ENG-010 | GHH Mining Machines | Mining equipment | Physical product, strong 3D/technical-visual fit |
| 8 | SA-ENG-008 | MechProTech | Mineral processing equipment | Complex product, likely under-explained |
| 9 | SA-ENG-011 | Tecman | Rock breaker systems | Highly visual product; test configurability for the 3D bonus |
| 10 | SA-ENG-009 | IMS Engineering | Crushers, sorting tech | Same |
| 11 | SA-ENG-013 | B&W Instrumentation and Electrical | E&I contracting | Serves formal-procurement clients; test prequalification material |
| 12 | SA-ENG-014 | DGC Africa | Mechanical engineering services | Sub-Saharan footprint implies multi-site capacity |
| 13 | SA-ENG-019 | Nyeleti Consulting | Consulting engineering | Professional services; reputation is the product |
| 14 | SA-ENG-021 | Ndodana Consulting Engineers | Consulting engineering | Long track record = deep unstoried project archive |
| 15 | SA-ENG-023 | MBSA Consulting | Consulting engineering | Multi-disciplinary; several storylines available |
| 16 | SA-ENG-007 | 4Sight OT Automation | Automation | Largest automation firm found; capacity likely present |
| 17 | SA-ENG-001 | Systems Automation & Management | Automation | Strongest technical-storytelling gap hypothesis in the set |
| 18 | SA-ENG-002 | Vertex Automation | Automation/robotics | Visual product, plausible 3D fit |
| 19 | SA-CON-012 | Alsandro | Industrial services | Broad service mix suggests a positioning problem, which is a sellable gap |
| 20 | CD-ENG-001 | MES Holdings | DRC mining EPCM | Tests the section 7 thesis: DRC work sold as a story, not a DRC sales effort |

**Selection rule to apply once audits exist.** Rank by EDOS, then drop any prospect where `actionable = false`, then drop any where `trigger_evidence_url` is empty. Contact in score order. Re-audit the queue monthly, because the trigger score decays and a Tier C company becomes a Tier A company the week it wins something.

---

## 12. DIGITAL GAP ANALYSIS

No company-level gap analysis is presented, for the reason given in section 11. What is presented is the **gap taxonomy** the engine detects and what each one is worth selling against, because this is the part that transfers directly into a sales conversation.

| Gap | How it presents | What it is worth to the client | First offer |
|---|---|---|---|
| **Storytelling gap** | Projects appear as an unlabelled photo gallery, or a list of client logos | Highest. This is the material business development actually lacks | Project Digital Showcase |
| **Content cadence gap** | LinkedIn page exists, last post 8 months ago | High when a marketing person exists (they are drowning), low when nobody owns it | Capability Content Programme |
| **Visual quality gap** | Site photos taken on a phone in bad light; stock images of unrelated equipment | High — it is the fastest thing to fix and the most visible improvement | Visual standard + reshoot brief |
| **Website gap** | Not responsive on a phone; copyright 2019; six pages | Medium-High. Easy to demonstrate live in the meeting | Website credibility rebuild |
| **Lead capture gap** | No form, no CTA, no analytics | Medium — real, but the client cannot feel it | Enquiry route fix (bundle, do not lead) |
| **Employer branding gap** | Actively recruiting, nothing on the page about working there | Medium-High and underrated. Recruitment pain is felt immediately and has a budget | Recruitment content sprint |

**The three most sellable gaps, in order: storytelling, visual quality, employer branding.** All three produce an artefact the client can see and judge within a week. Lead-generation gaps are real but sell badly, because the promised benefit arrives months later and cannot be demonstrated in the meeting.

---

## 13. SERVICE PORTFOLIO

| Tier | Service | Include from day one? | Rationale |
|---|---|---|---|
| Core | Engineering project case studies | **Yes** | The single defensible artefact |
| Core | Technical LinkedIn content built from real project material | **Yes** | Recurring revenue engine |
| Core | Project photography direction and visual standard | **Yes** | Fastest visible improvement; low tooling cost |
| Core | Capability statements / prequalification material | **Yes** | Maps to a budget the client already has |
| Core | Recruitment and employer-branding content | **Yes** | Easiest first sale; immediate felt pain |
| Secondary | Website rebuild (project-led) | **Yes, as a one-off** | R15k–R60k is the SA norm (S04); defensible above it only when content is included |
| Secondary | Technical explainer video | **Month 4+** | R25k–R75k market for 5–15 min (S05); needs a portfolio piece first |
| Secondary | Analytics and reporting | **Yes, bundled** | Cheap, and it makes the retainer measurable |
| Premium | Static 3D / technical visualisation | **Month 6+** | Market exists at R2,500–R10,000+ per image (S06); outsource before building |
| Premium | Interactive 3D / WebGL experiences | **Month 12+, on demand only** | No demand evidence (S17). Build only against a signed order |
| Do not build | Marketing intelligence platform / SaaS | **No** | See section 22 |
| Do not build | ML content-performance prediction | **No** | See section 22 |
| Do not build | Paid ad management | **No** | Different discipline, different risk, commodity margins, and it drags you into C06/C07 pricing |

---

## 14. PACKAGE DESIGN

### 14.1 The problem with the proposed packages

The three proposed packages are all **retainers**, all priced at or below the generalist band, and all defined by **output count** ("approximately 8 content pieces"). Three problems follow:

1. **A retainer is the hardest first sale to an engineering SME.** The buyer's own stated objection — "we prefer spending money on projects and equipment" — is a preference for *capital-shaped* purchases with a defined end. A monthly commitment to an unproven supplier is the wrong shape.
2. **Counting pieces makes you a piece factory.** It invites the client to compare your unit price with a freelancer's (C07), which you lose. It also caps your margin at exactly the moment AI makes pieces cheap, because the client will notice.
3. **R4,500–R6,000 is below cost.** Section 16 shows the workings.

### 14.2 Recommended structure: a ladder, not a menu

**TABLE 9 — Recommended service packages**

| Step | Offer | Price (ZAR) | Shape | What it contains | Purpose |
|---|---|---|---|---|---|
| 0 | **Digital Capability Review** | Free (2 hours) | Deliverable, not a meeting | Written review of how the firm appears to a new buyer, 5 named gaps, one competitor comparison, one rewritten example of their own material | Opens the door. Costs you two hours. Proves competence before any invoice. |
| 1 | **Project Digital Showcase** | **R18,000–R35,000** | One-off, 3 weeks | One completed project turned into: a full written case study, 8–12 treated images with a repeatable visual standard, a 4-post LinkedIn sequence, a one-page PDF for tender annexures | **The wedge.** Project-shaped, fixed-price, finite. This is what you sell first. |
| 2 | **Capability Pack** | **R45,000–R85,000** | One-off, 6–8 weeks | 3 case studies, capability statement, project-led website rebuild, visual standard document, enquiry route and analytics | Second sale. Only after step 1 has landed. |
| 3 | **Engineering Content Retainer — Foundation** | **R15,000/month** | 6-month minimum | 8–10 published pieces built from real project material, 1 case study per quarter, monthly measurement note, 1 strategy call | Entry retainer. Not entry-level work. |
| 4 | **Engineering Content Retainer — Growth** | **R25,000/month** | 6-month minimum | 12–16 pieces, 1 case study per month, recruitment content stream, quarterly technical video, measurement review | The target tier. Most clients should land here. |
| 5 | **Engineering Content Retainer — Authority** | **R40,000+/month** | 12-month | 20+ pieces, 2 case studies/month, technical video programme, tender and bid support, quarterly strategy session with the leadership team | For firms with a real business development function |
| Add-on | Technical explainer video | R30,000–R60,000 each | One-off | 2–5 minute technical video | Month 4+ |
| Add-on | Static technical 3D visualisation | R6,000–R12,000 per image | One-off | Industrial subject render | Month 6+, outsourced first |
| Add-on | Interactive 3D project experience | **R90,000–R180,000** | One-off | WebGL project walkthrough | Month 12+, against signed order only |

**Two structural rules.**

- **Never quote a retainer before a one-off has been delivered.** The wedge earns the right to the retainer. Selling a retainer cold to a first-time buyer in this segment is the single most common way this business fails quietly.
- **Never sell the retainer on piece count.** Sell it on *coverage*: "every significant project you complete gets told properly, and your business development team stops asking marketing for material that does not exist."

**Ad spend is always quoted separately and never marked up.** This is standard practice in the SA market (S01) and departing from it destroys trust the first time a client checks.

---

## 15. PRICING BENCHMARK

All figures from vendor-published South African pricing guides via search summaries. Evidence grade B: these are self-interested sources and no pricing page was opened directly. They converge, which is mildly reassuring, but convergence among vendors is not the same as verified market data. **Confirm three of these directly by requesting quotes before committing to a rate card.**

**TABLE 8 — South African pricing benchmark**

| Service | Low | Typical | High | Unit | Source |
|---|---|---|---|---|---|
| Social media management — freelancer | R2,500 | R4,500 | R8,000 | /month | S01 |
| Social media management — boutique agency (2–5 people) | R8,000 | R12,000 | R20,000 | /month | S01 |
| Social media management — mid-market agency | R20,000 | R30,000 | R50,000 | /month | S01 |
| Digital marketing retainer (general) | R8,000 | R15,000 | R25,000 | /month | S02, S03 |
| Website — simple 5-page | R5,590 | R10,000 | R15,000 | /project | S04 |
| Website — standard business site | R15,000 | R30,000 | R60,000 | /project | S04 |
| Website — complex corporate platform | R60,000 | R120,000 | R250,000 | /project | S04 |
| Corporate video — under 5 min | R5,000 | R15,000 | R25,000 | /video | S05 |
| Corporate video — 5 to 15 min | R25,000 | R45,000 | R75,000 | /video | S05 |
| Corporate video — 15+ min, high production | R75,000 | R120,000 | R250,000 | /video | S05 |
| Video — common rule of thumb | — | R10,000 | — | /produced minute | S05 |
| 3D still render — simple exterior | R2,500 | R6,000 | R10,000 | /image | S06 |
| 3D still render — complex photoreal | R25,000 | R35,000 | R60,000 | /image | S06 |
| 3D animation | R8,000 | R60,000 | R250,000 | /project | S06 |
| Ad spend (billed separately) | R2,000 | R6,000 | R10,000 | /month | S01 |
| **Interactive WebGL / Three.js site** | **no published SA benchmark found** | | | | — |

**The last row matters.** No South African published pricing for interactive 3D web work surfaced in any search. That is not a gap in the research — it is a signal about the size of the market. Where there is no price list, there is no repeat trade.

---

## 16. RECOMMENDED PRICING, PRODUCTION COST AND MARGIN

### 16.1 The cost model

Costing founder time at a **notional internal rate of R450/hour** — high enough to reflect scarce technical-plus-communication skill, low enough to be realistic for a new business in South Africa. All hour estimates are **assumptions**, derived from decomposing the workflow, not measured. Measure them from month one and replace these numbers.

**Hours to deliver one month of the Growth retainer (12–16 pieces + 1 case study):**

| Step | Hours with AI assistance | Hours without | AI-reducible? |
|---|---|---|---|
| Client interview / technical extraction | 2.5 | 2.5 | **No** |
| Research, spec and standards checking | 3.0 | 4.0 | Partly |
| Content planning | 1.5 | 2.0 | Partly |
| Drafting | 3.0 | 8.0 | **Yes, heavily** |
| Visual production and cleanup | 4.0 | 9.0 | **Yes, heavily** |
| Technical accuracy review | 2.5 | 2.5 | **No** |
| Client review and revisions | 2.5 | 2.5 | **No** |
| Scheduling and publishing | 1.0 | 1.5 | Partly |
| Measurement and reporting | 1.5 | 2.0 | Partly |
| Account management | 2.0 | 2.0 | **No** |
| **Total** | **23.5** | **36.0** | **≈35% reduction** |

**This is the honest AI number: roughly a third off, not the order of magnitude the technology is usually credited with.** The reason is visible in the table — 10.5 of the 36 baseline hours (interview, technical review, client revisions, account management) cannot be automated at all, and they are the hours that determine whether the output is correct.

**Tooling cost per client per month:** estimated **R400–R1,200**, dominated by image and video generation rather than text. Model and generation pricing changes frequently; **verify current published rates before modelling anything precisely.** The important structural point is that tooling is a small fraction of cost. Time is the cost.

### 16.2 Margins at each price point

| Offer | Price | Est. hours | Time cost @R450 | Tools | Total cost | Gross margin |
|---|---|---|---|---|---|---|
| **Proposed R4,500 starter (8 pieces)** | R4,500 | ~11 | R4,950 | R300 | **R5,250** | **−17% (loss-making)** |
| Proposed R6,000 starter | R6,000 | ~11 | R4,950 | R300 | R5,250 | 13% |
| **Recommended Foundation** | R15,000 | ~15 | R6,750 | R500 | R7,250 | **52%** |
| **Recommended Growth** | R25,000 | ~23.5 | R10,575 | R800 | R11,375 | **55%** |
| **Recommended Authority** | R40,000 | ~36 | R16,200 | R1,500 | R17,700 | **56%** |
| Project Digital Showcase | R25,000 | ~26 | R11,700 | R700 | R12,400 | **50%** |
| Capability Pack | R60,000 | ~70 | R31,500 | R1,800 | R33,300 | **45%** |
| Technical video (5 min) | R45,000 | ~48 | R21,600 | R2,500 | R24,100 | **46%** |
| Interactive WebGL page | R120,000 | ~110 | R49,500 | R2,000 | R51,500 | **57%**, but see below |

**The R4,500 tier loses money.** Even at a stripped-back eleven hours — which is not enough time to produce work that is technically correct — the cost exceeds the price. This is the clearest single argument in the report against the proposed pricing, and it does not depend on any market data at all, only on arithmetic.

**The WebGL margin is a trap.** 57% looks excellent until you account for the fact that the 110-hour estimate is unbounded on the upside for a first build, there is no benchmark to price against, and one project consumes most of a month's capacity for a single client. Price it high specifically so that almost nobody buys it.

### 16.3 Capacity ceiling

At roughly **120 delivery hours per month** for a solo operator (the rest going to sales, admin and business development):

| Mix | Clients | Monthly revenue | Hours used |
|---|---|---|---|
| 5 × Growth | 5 | R125,000 | 118 |
| 3 × Growth + 3 × Foundation | 6 | R120,000 | 116 |
| 2 × Authority + 2 × Growth | 4 | R130,000 | 119 |

**The ceiling for one person is roughly R120,000–R130,000/month.** Growing past it requires hiring, and the hire is hard: the differentiator is technical fluency, so a junior copywriter does not extend capacity, they dilute the product. Plan the second hire as an engineering graduate who can write, not a marketer who can be taught engineering.

### 16.4 Recommended rate card summary

| | Minimum viable | Competitive | Premium |
|---|---|---|---|
| Monthly retainer | R15,000 | R25,000 | R40,000+ |
| Project showcase | R18,000 | R25,000 | R35,000 |
| Capability pack | R45,000 | R60,000 | R85,000 |
| Technical video | R30,000 | R45,000 | R60,000 |
| Static 3D visualisation | R6,000 | R9,000 | R12,000 |
| Interactive 3D | R90,000 | R135,000 | R180,000 |

---

## 17. BUSINESS MODEL

### Business Model Canvas

**Customer segments**
- Primary: CIDB Grade 7–9 civil, structural and building contractors in a post-award or pre-tender window
- Primary: mining services, mining equipment and EPCM contractors, including those working into the DRC
- Primary: renewable energy EPC and IPP-facing engineering firms
- Secondary: consulting engineering firms at CESA member scale
- Secondary: industrial automation and systems integrators
- Deferred: metals and engineering manufacturers (sector contracting — S21)
- Excluded: CIDB Grade 1–4 micro contractors; DRC-domiciled SMEs

**Value propositions**
- For the MD: *the work you have already done, turned into the material that wins the next job*
- For the business development manager: capability material that exists when a client asks for it
- For the technical director: content that survives review by the client's own engineers
- For the HR lead: recruitment material that explains what the work actually is

**Channels**
- LinkedIn direct outreach to named decision-makers (POPIA-compatible — S19)
- Trade events: Electra Mining, Africa Energy Indaba, DRC Mining Week, CESA and SAIIE gatherings
- Referral from the first three clients — the highest-yield channel in a relationship-driven market
- Trade press presence: Engineering News / Mining Weekly reach 310,000+ weekly (S24) and is also the trigger-event source
- Own published work as the primary proof — the portfolio *is* the marketing

**Customer relationships**
- Founder-led throughout the first year. In this segment the founder's technical credibility is the product; delegating the client relationship destroys it
- Quarterly on-site presence with retainer clients — a site visit produces more usable material than ten emails
- Deliverable-first, not meeting-first

**Revenue streams**
- One-off project work (the wedge): R18,000–R85,000
- Monthly retainers: R15,000 / R25,000 / R40,000+
- Add-ons: video, visualisation
- **Not** ad spend margin. **Not** SaaS. **Not** licensing.

**Key resources**
- The founder's engineering fluency — the only non-replicable asset
- A growing library of published case studies (compounding: each one sells the next)
- The EDOS prospecting engine and its accumulating audit database
- AI production tooling (commodity, replaceable, not a moat)

**Key activities**
- Technical extraction interviews
- Writing and technical review
- Visual production and direction
- Trigger-event monitoring and prospect scoring
- Selling — which in year one is more than half the founder's time

**Key partners**
- Freelance photographer or videographer per project (variable cost, no payroll)
- 3D visualisation studio for outsourced renders before building the capability
- A web developer for site builds until volume justifies doing them in-house
- Legal advice on POPIA compliance before any outbound programme

**Cost structure**
- Founder time (dominant — approximately 85–90% of cost of delivery)
- AI tooling: R400–R1,200 per client per month
- Subcontractors: variable, per project
- Fixed overhead: minimal. This business should not carry an office in year one

**Structural read.** High gross margin (45–56%), very low fixed cost, hard capacity ceiling, no network effects, no defensible IP. That is the profile of a **high-quality lifestyle consultancy**, not a scalable venture. That is not a criticism — it is a good business with a fast route to profitability — but it should be entered with the right expectation, and it is the reason section 22 recommends against the platform.

---

## 18. CUSTOMER VALUE PROPOSITION

**The pitch, in the order it should be delivered:**

> "You have done work that most of your competitors could not do. Somebody who has never met you cannot tell. When your name goes to a client's technical committee, or a procurement officer checks you out before a prequalification, what they find does not match what you actually are. I am an engineer. I turn the work you have already done into material that closes that gap — case studies your business development team can hand over, project material that survives review by the client's own engineers, and a visual standard that matches the standard of the work."

**Why this pitch and not the alternatives:**

| It does | It does not |
|---|---|
| Open with their competence, not their deficiency | Tell an MD his marketing is bad |
| Name a specific moment (prequalification, technical committee) | Promise leads it cannot yet evidence |
| Establish the differentiator in three words ("I am an engineer") | Mention AI |
| Describe an artefact he can picture | Mention 3D, immersive experiences, or analytics |
| Attach to an existing budget line | Ask him to create a marketing budget |

**What to never say in a first meeting:** AI, immersive, engagement, brand, content strategy, digital transformation, thought leadership. Every one of these either triggers the "I am not a marketer" reflex or invites a price comparison with a freelancer.

---

## 19. SALES STRATEGY

### 19.1 Show, do not tell

The first contact carries **an artefact, not a pitch.** Specifically: take one of the prospect's own recent projects and produce a single, finished, obviously-better version of how it could be presented. One page. Their logo. Their project. Their photographs, re-treated.

This works for a reason that is specific to this market: an engineer evaluates evidence, not claims. A deck describing what you could do is an assertion. A finished artefact about his own project is a demonstration, and it is very difficult to argue with.

**Cost per demonstration: two to three hours.** At a 20% meeting conversion rate, that is 10–15 hours per meeting secured — expensive, and the reason section 26 caps the experiment at 50 prospects rather than 500. Do not automate this step. The moment it becomes a template, it stops working.

### 19.2 The meeting

1. Show the artefact. Say nothing for a moment.
2. Ask one question: *"How would your business development team use something like this?"* Then be quiet. The answer tells you whether there is a budget, who owns it, and what the real problem is.
3. Do not present services. Do not present prices unless asked.
4. Close on the wedge: *"Let me do this properly for one project. Fixed price, three weeks, and you keep everything whether or not we work together again."*

### 19.3 Which decision-maker

| Company type | Best contact | Why |
|---|---|---|
| SME, under ~50 staff | **Owner / Managing Director** | Sole decision-maker, no procurement process, fast yes or fast no |
| Medium, 50–250 staff | **Business Development or Commercial Manager** | Owns the pain (missing capability material), has a budget, and is judged on winning work. The MD will be consulted but the BD manager brings you in |
| Medium with a marketing function | **Marketing/Communications Manager** | Usually one person covering everything and drowning. They become an internal advocate rather than a gatekeeper — but they are also the person a future in-house hire would replace you with (C08) |
| Consulting engineering firm | **Managing Partner or Practice Lead** | Reputation is the product; the partner owns it |

**Rule: never open with the marketing manager at a company that also has an owner-MD who decides everything.** In owner-managed South African engineering SMEs, the marketing manager frequently cannot approve R15,000 and will spend three weeks failing to get it approved.

### 19.4 Handling the hardest objection

> *"We get all our work through relationships and referrals. What does this change?"*

Wrong answer: "Referrals do not scale." (Argumentative, and he knows it already.)

Right answer: *"Nothing about your referrals. This is for the part they do not reach — when your name is on a prequalification list and the person reading it has never met you, or when a client's technical committee is comparing three firms on paper. What are they looking at right now?"*

Then stop. The follow-up question does the work, because usually nobody at the firm knows the answer.

---

## 20. CUSTOMER ACQUISITION STRATEGY

### 20.1 The workflow

```
MONITOR TRIGGER SOURCES  (Engineering News, tender awards, LinkedIn company updates,
        |                 CIDB register changes, trade press announcements)
        v
IDENTIFY COMPANY + TRIGGER  (record the evidence URL - no URL, no outreach)
        |
        v
AUDIT DIGITAL PRESENCE  (src/audit.py for the website; LinkedIn counted by hand)
        |
        v
CALCULATE EDOS  (src/pipeline.py score)
        |
        v
DROP anything with completeness < 0.6 or no trigger evidence
        |
        v
GENERATE SALES BRIEF  (src/pipeline.py briefs -> 3-5 named gaps + recommended first offer)
        |
        v
BUILD CUSTOM ARTEFACT  (2-3 hours, their project, their logo)
        |
        v
CONTACT DECISION MAKER  (LinkedIn / phone / warm intro - NOT cold email, see POPIA below)
        |
        v
MEETING -> WEDGE (R18k-R35k one-off) -> RETAINER
```

### 20.2 Trigger events, ranked by value

| Trigger | Score weight | Where to find it | Why it works |
|---|---|---|---|
| Major contract award | 12 | Engineering News, tender award notices, client announcements | Budget just arrived, and there is something new to say |
| Large tender in preparation | 11 | Tender portals, industry contacts | Capability material is needed *now*, for a specific document |
| New market entry | 12 | LinkedIn company updates, press | No referral network in the new market — the one time the referral objection collapses |
| New facility or office | 10 | Local press, LinkedIn | Visible, photographable, and they want it seen |
| Acquisition or investment | 10 | Business press | New owners expect professional presentation |
| Product launch | 10 | Trade press, exhibitions | Needs explanation material by definition |
| Certification / accreditation | 8 | Company announcements | Credibility event with nothing built around it |
| Active recruitment drive | 7 | LinkedIn jobs, own careers page | Immediate felt pain, fast decision, easy first sale |
| Project completion | 6 | LinkedIn, client announcements | The single richest raw material for a case study |
| Partnership | 6 | Press releases | Joint announcement, two audiences |
| Leadership change | 5 | LinkedIn | New MDs change suppliers |

### 20.3 The POPIA constraint on acquisition

POPIA section 69 requires opt-in consent for unsolicited electronic direct marketing to natural persons, and prohibits buying, renting or scraping contact lists (S19). Practitioner commentary suggests role-based addresses aimed at the legal entity sit differently, but that is interpretation.

**Practical effect on the plan:**

| Channel | Status | Note |
|---|---|---|
| LinkedIn connection request + message | **Use** | Not electronic direct marketing in the s.69 sense; the platform's own opt-in governs |
| Telephone | **Use** | Direct marketing rules differ from s.69; still respect opt-out registers |
| Warm introduction / referral | **Use — best channel** | Also the highest-converting in a relationship market |
| Role-based email (info@, tenders@) | **Probably use** | Get legal advice first |
| Cold email to a named individual | **Do not use** | Requires prior opt-in |
| Purchased or scraped list | **Do not use** | Explicitly not permitted |

This is not a footnote. **It removes the highest-volume, lowest-cost acquisition channel from the plan**, which pushes the model toward low-volume, high-effort, artefact-led outreach — and that in turn is why the capacity ceiling in section 16.3 binds so early.

**TABLE 10 — Customer acquisition strategy**

| Stage | Activity | Channel | Target volume (8 weeks) | Cost per unit | Success measure |
|---|---|---|---|---|---|
| Source | Trigger monitoring | Engineering News, tender portals, LinkedIn | 200 companies screened | ~0.1 h | 50 with a live trigger |
| Qualify | Audit + EDOS scoring | `src/pipeline.py` | 50 audited | ~0.5 h | 25 scoring Tier A/B |
| Prepare | Custom artefact | Manual, founder | 25 built | 2–3 h | — |
| Contact | Decision-maker outreach | LinkedIn, phone, referral | 50 contacted | 0.3 h | ≥20% meaningful reply |
| Meet | Discovery + artefact | Video or on-site | 6–10 meetings | 1.5 h + travel | ≥6 |
| Close | Wedge offer | Proposal | 3 pilots | 2 h | ≥3 at ≥R18,000 |
| Expand | Retainer conversion | Post-delivery review | 2 retainers | 1 h | ≥2 at ≥R15,000 |

---

## 21. AI PRODUCTION MODEL

### 21.1 The workflow, with the human gates marked

```
CLIENT PROJECT MATERIAL  (drawings, method statements, site photos, an interview recording)
        |
        v
[HUMAN] TECHNICAL EXTRACTION           <- cannot be automated. This is the product.
        |                                  An engineer asking "why was that difficult?"
        v
[HUMAN] ANGLE AND STRUCTURE            <- what the story actually is
        |
        v
[AI] DRAFTING                          <- large language model, heavily directed
        |
        v
[AI] VISUAL GENERATION AND TREATMENT   <- image models for diagrams, treatment, backgrounds
        |
        v
[HUMAN] TECHNICAL ACCURACY REVIEW      <- HARD GATE. Nothing ships past this unchecked.
        |                                  A wrong load figure or a misnamed standard
        v                                  destroys the client relationship permanently.
[HUMAN] BRAND AND CLIENT APPROVAL      <- HARD GATE
        |
        v
PUBLISH -> MEASURE -> feed back into the next month's angles
```

### 21.2 What AI actually saves

From the cost model in section 16.1: **approximately 35%** of total production time. Drafting drops from about 8 hours to 3; visual production from about 9 to 4. Everything else moves little or not at all.

**Do not claim more than this.** The temptation is to describe an 80% reduction because the drafting step really does collapse. It does — but drafting is only 22% of the baseline workload. Amdahl's law applies to agencies as much as to processors.

### 21.3 What AI must never touch

| Never automate | Why |
|---|---|
| Technical claims about load, capacity, tolerance, standards, compliance | A single wrong figure in a published case study is a professional liability for the client, not just an embarrassment |
| Client names, project values, dates | Fabricated specifics are the fastest way to lose an engineering client permanently |
| Quotes attributed to named people | Never put words in a client engineer's mouth |
| Anything going into a tender or prequalification document | The client is signing it. It must be true |

Build a **claims register** for every client from day one: every technical figure published, its source document, and who at the client approved it. This costs an hour a month and it is the difference between a supplier and a liability.

### 21.4 The strategic problem with the AI advantage

It is real, it is worth about a third of production time, and it is **temporary and non-exclusive**. Competitors get the same tools. More seriously, the client gets the same tools (C09) — and an engineering firm that discovers its supplier is running the same model it could run itself will renegotiate.

**Therefore: AI is an internal cost decision that is never mentioned to a client and never appears in a proposal.** What is sold is the technical extraction, the accuracy gate, and the artefact. Those are the parts the client cannot replicate, and they are the parts AI does not touch.

**One further risk.** Reported buyer behaviour has turned against visible AI content — 94% of B2B buyers fact-check AI outputs and distrust of online resources rose from 39% to 47% in a year (S15). A firm whose published content reads as machine-generated damages exactly the credibility it was hired to build. The technical accuracy gate is therefore also a *voice* gate: material must read as though an engineer wrote it, because an engineer did.

---

## 22. FUTURE AI/ML PLATFORM

**Recommendation: do not build it. Not in year one, and probably not at all.**

The proposal is to turn the internal tooling into a recurring AI marketing intelligence platform that answers "what should this engineering company post next?". Four objections, in order of severity.

**1. The market is too small to support a platform.** Section 5 estimated roughly 330 realistically approachable South African prospects per year. Even capturing an implausible 30% of the entire payable universe (~4,400 firms) at R2,000/month gives R2.6m/month gross — but the realistic ceiling is a few hundred customers, which is not a software business, it is a spreadsheet with a login. Platform economics need either a large market or high price, and this has neither.

**2. The data does not exist at the required density.** ML content-performance prediction needs thousands of labelled outcomes per context. A single engineering SME publishes perhaps 150 pieces a year with engagement in the low double digits. Twenty clients over three years gives you a dataset too small and too heterogeneous to train anything that beats a competent human's judgement. This is the same problem the thesis literature on small-sample forecasting documents — intermittent, low-volume series resist modelling — and the answer here is the same: do not model what you cannot measure.

**3. It solves a problem the client does not have.** "What should we post next?" is not an engineering MD's question. His question is "do we look credible when someone checks". A platform answering the first question sells to marketing departments — which is a different market, already served, and one where you have no advantage.

**4. It converts a 50% gross margin service business into a pre-revenue software business.** The opportunity cost is the entire first year of client acquisition.

**What to build instead — and it is genuinely valuable.** The EDOS engine and its accumulating audit database *is* the useful internal asset. Every audit adds a row. After 300 audits you know, with evidence, what the South African engineering sector's digital baseline actually looks like. That is a proprietary dataset nobody else has, it makes every sales conversation sharper, and it might eventually be publishable as an industry benchmark report — which is a marketing asset, not a product.

**Revisit the platform question only if** three conditions are met simultaneously: 15+ retainer clients, a documented pattern that a majority of them ask for the same automated capability, and at least one of them offering to pay for it in advance.

---

## 23. 3D / IMMERSIVE WEB OPPORTUNITY

**Recommendation: option D — a later-stage service. Not core, not premium-now, not an early add-on.**

### 23.1 The evidence

| Finding | Source | Reading |
|---|---|---|
| Three.js detected on ~3,585 active domains globally, March 2025 | S17 | Even at a 10× undercount, negligible against the global web |
| No conversion, lead-generation or ROI evidence for B2B 3D sites surfaced in any search | — | Absence of evidence is not evidence of absence, but it is evidence that nobody is selling on proven results |
| No published South African pricing benchmark for interactive 3D web work | S15 table, last row | Where there is no price list, there is no repeat trade |
| SA studios sell static renders at R2,500–R10,000 and animation from R8,000 | S06 | The *visual outcome* an industrial buyer wants is already available far cheaper |
| Configurators are genuinely used for products with variants | S17 | The one real use case — and it needs a product with variants |

### 23.2 The honest read

The demand argument for immersive 3D in this market rests on intuition, not evidence. It is genuinely impressive, it genuinely differentiates a pitch, and industrial subjects genuinely benefit from spatial explanation. None of that is the same as a client with a budget line.

More damagingly: a WebGL project consumes roughly 110 hours (section 16.2) — most of a month's delivery capacity — for a single client, in a service where the compounding asset is *volume of published case studies*. Building one 3D site in month three costs you five case studies you would otherwise have in the portfolio.

### 23.3 Where 3D does earn its place

1. **In the pitch, not the product.** One well-made interactive demonstration of *your own* work signals technical range and separates you from every content agency in the market. Build exactly one, for yourself, when there is slack — not for a client.
2. **Static technical visualisation, outsourced.** R6,000–R12,000 per image, subcontracted to an existing SA studio. Sell it, do not build it, until volume justifies the capability.
3. **Product configurators for equipment manufacturers with genuine variants** — SA-ENG-010 (GHH), SA-ENG-011 (Tecman), SA-ENG-009 (IMS) are the plausible candidates in the current database. This is the one case with a real mechanism: the configurator replaces a sales engineer's time.
4. **Never speculatively.** Interactive 3D is built against a signed order at R90,000+, or it is not built.

---

## 24. SWOT

**Strengths**
- Founder is an engineer. The only differentiator competitors cannot cheaply buy (section 8.1)
- Technical fluency that survives review by the client's own engineers
- AI-assisted production giving roughly 35% lower delivery cost than a conventional agency (section 16.1)
- Very low fixed cost — the business is profitable at two clients
- Genuinely narrow niche in a market where at least five agencies claim "industrial" but position broadly
- A working, tested prospecting and scoring engine before the first sales call

**Weaknesses**
- No portfolio, no reference client, no track record. In a referral-driven market this is the binding constraint, not a minor one
- Solo capacity ceiling of roughly R120,000–R130,000/month (section 16.3)
- The differentiator does not delegate — the second hire is genuinely hard
- Dependence on third-party AI APIs for the cost advantage, with no control over their pricing
- No French-language capability, which closes the DRC domestic market
- Selling is more than half the founder's time in year one, and it is the skill least related to the founder's training

**Opportunities**
- R1.06 trillion committed public infrastructure spend 2026–2029 (S08)
- Construction growth of 2.8% in 2026 against contracting manufacturing (S07, S21) — a clear, evidence-based segment choice
- DRC mining expansion pulling SA firms north (S22), sellable as project stories to SA-domiciled clients
- Genuine, widespread technical storytelling gap across the sector
- Trust dislocation favouring verifiable technical specificity as generic content becomes free (S15)
- Recruitment content as an under-served, fast-decision entry sale
- The audit database as an accumulating proprietary asset (section 22)

**Threats**
- **Clients using AI directly** (C09) — the single largest structural threat, and it grows monthly
- **CubicICE and Shift ONE** already hold the specialist position, one with 30+ years of relationships (C01, C02)
- **Freelancer price floor at R2,500–R8,000** anchoring buyer expectations (C07)
- **In-house hire** as the natural next step for any client spending R25,000/month (C08)
- **POPIA s.69** removing cold email as an acquisition channel (S19)
- **Manufacturing sector contraction** shrinking the largest identified universe (S21)
- **Commoditisation of AI-generated content** eroding the production advantage entirely within 12–24 months
- **Reputational risk from a single technical error** in published client material — asymmetric and permanent

---

## 25. RISKS

| # | Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|---|
| R1 | **Nobody buys at R15,000+** — the segment's willingness to pay is below the viable price | Medium | Fatal | This is exactly what section 26 tests. Do not scale before it is answered. Fall back to one-off-only if retainers fail but wedges sell |
| R2 | **Client discovers the AI workflow and renegotiates** | Medium-High | High | Never sell AI. Sell technical extraction and the accuracy gate. Price on outcome, never on piece count |
| R3 | **A technical error is published in client material** | Medium | Severe, permanent | Hard accuracy gate; claims register with source documents and named client approval for every figure; professional indemnity cover before the first retainer |
| R4 | **Overpromised ROI leads to churn and a bad reference** | High if leads are promised | Severe in a referral market | Never promise leads before evidencing them. Contract on deliverables and measurement, not on pipeline outcomes |
| R5 | **Founder capacity exhausted at 5 clients; growth stalls** | High | Medium | Plan the second hire (engineering graduate who writes) at 4 clients, not 6. Productise ruthlessly |
| R6 | **POPIA breach through outbound email** | Medium | High (regulatory + reputational) | LinkedIn/phone/referral only; legal advice before any email programme; documented opt-in for every subscriber |
| R7 | **Client confidentiality breach** — NDAs, mine site access rules, security-sensitive infrastructure | **High** | Severe | Written publication consent per project before work starts. Assume every mining and infrastructure project is restricted until proven otherwise. This risk is systematically underrated in the original brief |
| R8 | **IP and copyright in AI-generated imagery** | Medium | Medium | Avoid generating recognisable third-party equipment, logos or people. Contract must state who owns the output and warrant only what you can warrant |
| R9 | **Platform dependence** — LinkedIn algorithm or policy change | Medium | Medium | Deliverables must have value off-platform: PDFs, tender annexures, website content the client owns |
| R10 | **AI API price increase or capability withdrawal** | Medium | Medium | The advantage is 35%, not existential. Model the business at zero AI assistance and confirm it still works at the recommended prices — it does, at roughly 30–35% margin |
| R11 | **Commoditisation within 24 months** as every agency runs the same tools | **High** | High | The moat is the engineering fluency, not the tooling. Invest the AI time saving into deeper technical work, not into more volume |
| R12 | **DRC exposure** — FX, payment, compliance | Low if section 7 followed | High if ignored | Bill South African entities in ZAR. Do not sell into DRC-domiciled SMEs |
| R13 | **Single-client concentration** — one client at 40% of revenue | High early | High | Cap any client at 35% of revenue from month six |
| R14 | **Sector downturn** in construction or mining removing the trigger flow | Low-Medium | High | Diversify across construction, mining services and energy from the start |

---

## 26. MARKET VALIDATION EXPERIMENT

**Purpose: answer one question — will South African engineering firms pay R18,000+ for a fixed-price project story, and convert to a R15,000+ retainer?** Nothing else in this report matters until that is answered.

### 26.1 Design

**Duration:** 8 weeks. **Cost:** founder time plus roughly R3,000–R5,000 in tooling and travel. **Sample:** 50 qualified, triggered prospects.

| Week | Activity | Output |
|---|---|---|
| 1 | Build the prospect list to 110+ from CIDB register, MEMSA, CESA, SEIFSA, exhibitor lists | `companies.csv` at 110+ rows |
| 1–2 | Run `audit`, fill manual signals, score, drop everything below completeness 0.6 or without trigger evidence | 50 qualified prospects with EDOS scores |
| 2 | Build 3 speculative artefacts and 1 self-portfolio case study | Proof material |
| 3–6 | Contact 50 decision-makers. 25 Tier A/B get a custom artefact; 25 Tier B/C get the mini audit only | **This split is itself an experiment** — it measures whether the 2–3 hour artefact is worth the time |
| 3–7 | Meetings; offer the wedge at R18,000–R35,000 | Pilots signed |
| 5–8 | Deliver pilots; offer retainer conversion at delivery review | Retainers signed |
| 8 | Recalibrate EDOS bands against actual outcomes | Corrected scoring model |

### 26.2 What to record for every prospect

Score, tier, completeness, trigger type and age, contact channel, whether an artefact was built, reply within 10 days, meeting held, price quoted, price objection raised, objection type (verbatim), pilot signed, price paid, retainer converted, retainer value.

**The verbatim objections are the most valuable output of the experiment**, more valuable than the conversion rate. Ten recorded objections in the prospect's own words will reshape the positioning more than any number in this report.

### 26.3 Decision thresholds

These are **decision rules, not benchmarks.** No reliable South African B2B outbound conversion data was found, and inventing a benchmark to measure against would defeat the purpose of the experiment.

| Metric | GO | RETHINK | NO-GO |
|---|---|---|---|
| Meaningful replies from 50 contacts | ≥10 (20%) | 5–9 | <5 |
| Meetings held | ≥6 | 3–5 | <3 |
| Price objection is the *primary* objection | <40% of meetings | 40–60% | >60% |
| Paid pilots at ≥R18,000 | **≥3** | 2 | **≤1** |
| Retainer conversions at ≥R15,000 within 60 days | **≥2** | 1 | **0** |

**GO** = both bolded thresholds met. Proceed to the 90-day plan and hire nobody yet.

**RETHINK** = pilots sell but retainers do not. This is the most likely partial outcome and it is not a failure — it means the business is a **fixed-price project studio**, not a retainer agency. That is a viable business with a different cost structure and different growth ceiling. Re-plan around it.

**NO-GO** = one or fewer paid pilots. The positioning is wrong. Before abandoning the sector, test the two adjacent hypotheses that this experiment does not cover:
- *Recruitment content as the primary offer* — faster decision, clearer pain, possibly a different buyer (HR rather than BD)
- *Selling to the large firms instead* — GIBB, Zutari-scale consultancies and Tier-1 contractors have marketing departments with real budgets and the same technical-writing shortage. The buyer is a marketing manager, the sale is longer, and the work is subcontract rather than client-facing — but the willingness to pay is not in question.

### 26.4 What would prove the business viable

Three paying clients, two of them recurring, at the recommended prices, acquired without discounting, with at least one arriving by referral from another. The referral is the single strongest signal available in this market: it means the work is good enough to stake a relationship on.

### 26.5 What would make it fail

In order of probability:
1. Prospects like the artefact, praise it, and do not buy — the classic "interesting, send me information" outcome. Watch for this specifically; enthusiasm is not demand.
2. Price collapses toward the freelancer band under negotiation pressure, and you accept it once. After that the price is set.
3. Delivery takes twice the estimated hours and margin disappears. Measure hours from the first pilot.
4. A technical error in published material costs a client and a reference.
5. The founder spends year one building tooling instead of selling.

---

## 27. MVP

**Build this:**

| Component | Detail | Effort |
|---|---|---|
| One productised offer | Project Digital Showcase, R18,000–R35,000, fixed scope, 3 weeks | Defined, not built |
| Three speculative artefacts | Real prospects' real projects, finished quality | 9 hours |
| One self case study | Your own work, published, proving you can do what you sell | 8 hours |
| A one-page site | The offer, three examples, one contact route. Nothing else | 6 hours |
| The EDOS pipeline | **Already built and tested in this repository** | Done |
| A prospect list of 110+ | From the five directory sources in section 9 | 8 hours |
| A claims register template | Per-client technical claim tracking | 1 hour |
| Contract template with publication consent | Legal review | External |

**Total: roughly one week of build, then eight weeks of selling.**

**Do not build:** a platform, an ML model, a WebGL site, an n8n automation stack, a CRM integration, a client dashboard, a brand identity system, or a services page listing twelve capabilities. Every one of these is a way of avoiding the sales calls.

**The single most important MVP component is the self case study.** A supplier of case studies who has no case study of their own has already lost the argument.

---

## 28. 90-DAY LAUNCH PLAN

**Days 1–14 — Build the minimum, and only the minimum**
- Expand `companies.csv` to 110+ from the CIDB register, MEMSA, CESA, SEIFSA and exhibitor lists
- Run the audit pipeline; fill manual signals; score; produce the Tier A/B queue
- Write and publish the self case study
- Build the one-page site
- Get the contract template and publication-consent clause reviewed
- Take POPIA advice on outbound channels
- *Do not build a 3D demo. Do not build automation.*

**Days 15–45 — Contact 50, and record everything**
- 25 Tier A/B prospects: custom artefact then contact
- 25 Tier B/C prospects: mini audit then contact
- LinkedIn, phone and referral only
- Target 6+ meetings
- Record every objection verbatim
- **Checkpoint at day 45:** if fewer than 3 meetings from 50 contacts, stop and diagnose the message before contacting anyone else

**Days 46–75 — Deliver the pilots**
- Deliver 2–3 wedge projects at full price
- **Measure actual hours against the section 16.1 estimates and replace them**
- Get written permission to publish every pilot as a case study — this is the compounding asset
- Convert at the delivery review, not by email

**Days 76–90 — Decide**
- Apply the section 26.3 thresholds honestly
- Recalibrate the EDOS bands against real outcomes
- Publish the pilot case studies
- Ask every pilot client for one introduction
- Write the go/no-go decision down before looking at the numbers again

**What success looks like at day 90:** 3 delivered projects, 2 retainers signed, 3 published case studies, roughly R70,000–R110,000 invoiced, a corrected cost model based on measured hours, and one referral in the pipeline.

**What must not happen by day 90:** a built platform, a 3D showcase, a hire, an office, or a discounted retainer below R15,000.

---

## 29. FINAL GO/NO-GO RECOMMENDATION

**Verdict: CONDITIONAL GO — on a reshaped business, subject to the section 26 experiment.**

The evidence supports a specialist engineering content business in South Africa. It does not support the business as specified: the pricing is below cost at the entry tier, the AI differentiator is temporary and unsellable, 3D has no demonstrated demand, the DRC is not a viable second market on the proposed model, and the platform ambition is unsupported by market size.

**The eighteen questions, answered directly:**

**1. Is there evidence of real demand?** Evidence of *conditions* favouring demand — committed infrastructure spend (S08), construction growth (S07), a real and widespread technical storytelling gap, and at least five agencies already selling into this space, which is itself a demand signal. **No direct evidence that these specific buyers will pay these specific prices.** That is unresolved and only the experiment resolves it.

**2. Which customer segment first?** CIDB Grade 7–9 contractors and mining-services / EPCM firms, in a trigger window, with a reachable owner-MD or business development manager.

**3. Which industries?** Construction and infrastructure, mining services and equipment, renewable energy EPC. **Defer manufacturing** — it is contracting (S21).

**4. Which company size?** 40–250 employees, or CIDB Grade 7+. Below 40 the budget is not there; above 250 the sale becomes a procurement process.

**5. Which geographic market?** South Africa, decisively. Gauteng, then the mining corridors (Rustenburg, Witbank, Richards Bay) and the Western Cape. DRC as a *project-story service line* sold to South African clients, not as a market.

**6. What service first?** The Project Digital Showcase — one completed project turned into a case study, a visual standard and a LinkedIn sequence, fixed price, three weeks.

**7. Should 3D websites be included immediately?** **No.** Month 12+, against a signed order, at R90,000+. Build exactly one for your own portfolio when there is slack.

**8. What should the initial package contain?** One project, fully told: written case study, 8–12 treated images, a 4-post sequence, and a one-page PDF the client can put in a tender annexure. Fixed scope, fixed price, finite.

**9. What should the initial price be?** **R18,000–R35,000 for the wedge; R15,000 minimum monthly retainer.** Never below R15,000/month — section 16.2 shows the arithmetic.

**10. What should NOT be included?** Ad management, SEO, a platform, ML, interactive 3D, lead-generation guarantees, and any promise about pipeline you cannot evidence.

**11. Strongest differentiation?** *The person writing the case study can read the drawing.* Not AI. Not 3D. Not "we understand engineering" — five competitors already say that.

**12. What should the sales pitch be?** Section 18. Open with their competence, name the moment (prequalification, technical committee), establish that you are an engineer, show an artefact about their own project, ask one question, close on the wedge.

**13. Biggest reason a company says NO?** *"We get our work through relationships and tenders — what does this change?"* Not price, and not scepticism about marketing.

**14. How do we overcome it?** Do not argue with it. Reframe to the moments referral does not reach — prequalification, a client's technical committee, a procurement check — and ask what they are looking at right now. Nobody at the firm knows, and that is the opening.

**15. What should the MVP look like?** Section 27. One offer, three speculative artefacts, one self case study, a one-page site, the scoring pipeline, a 110-company list. One week of build.

**16. What should we NOT build yet?** The platform, the ML model, WebGL, automation stacks, CRM integration, dashboards, a twelve-service capability page.

**17. What evidence would prove viability?** Three paying clients, two recurring, at full price, with at least one arriving by referral from another.

**18. What would make the business fail?** In order: prospects who admire the work and do not buy; accepting one discount to the freelancer band; delivery hours running to twice the estimate; a published technical error; and spending year one building tooling instead of selling.

### The honest bottom line

This is a good small business and an implausible large one. Gross margins of 45–56%, near-zero fixed cost, profitability at two clients, and a genuine differentiator — against a hard solo ceiling around R125,000/month, no network effects, no defensible IP, and a production advantage with a 12–24 month half-life.

If the goal is a technically-grounded consultancy earning well while building a portfolio and a reputation, the evidence supports it and the plan above is the shortest route.

If the goal is a scalable platform business, **the evidence in this report does not support it**, and the honest advice is that the market is too small, the data too sparse, and the buying behaviour too relationship-bound for software to be the answer.

Run the eight-week experiment. Three pilots and two retainers, and the answer is yes. One or none, and the positioning is wrong — and section 26.3 says what to test next.

---

## 30. SOURCES

Full register with evidence grades in `data/sources.csv`. Grades: **A** = primary or authoritative institution; **B** = credible secondary or converging vendor-published data; **C** = single trade or agency source; **D** = directory listing only.

| ID | Claim | Publisher | Grade |
|---|---|---|---|
| S01 | SA social media retainer bands by provider type | Growth Pulse Media | B |
| S02 | SA digital marketing agency cost ranges 2026 | Syte | B |
| S03 | SA social media packages R6k–R25k/month | ReachDigital | B |
| S04 | SA website design pricing bands | Gridweb / SME Rocket / Black Snow Group | B |
| S05 | SA corporate video pricing by length | Astral Studios / Audio Visual Lab / Sonnix | B |
| S06 | SA 3D render and animation pricing | PropertyRender / Astral Studios | B |
| S07 | SA construction +2.8% real 2026; CAGR 3.9% to 2030 | GlobalData | A |
| S08 | R1.06trn public infrastructure spend 2026–2029 MTEF | RIB Software (summarising SA Budget 2026) | A |
| S09 | SEIFSA: 1,300+ member companies, 170,000+ employees | SEIFSA | A |
| S10 | CESA: 580+ member firms, ~19,000 employees | CESA | A |
| S11 | CIDB: >120,000 registered contractors, 9 grades | CIDB | A |
| S12 | CIDB tender limits: G7 R60m, G8 R200m, G9 unlimited | TenderPro SA / eTenderPortal | B |
| S13 | LinkedIn 17.0m members SA, 37.8% of adults | DataReportal Digital 2026: South Africa | A |
| S14 | DRC 30.5% internet, 9.2% social, LinkedIn 0.9% | DataReportal Digital 2026: DRC | A |
| S15 | 94% of B2B buyers fact-check AI outputs; distrust 39%→47% | MarketScale | B |
| S16 | 46% trust a brand less on learning AI was used | That Random Agency (secondary) | C |
| S17 | Three.js on ~3,585 active domains, March 2025 | Utsubo / technologychecker.io | C |
| S18 | Manufacturing marketing budgets 5–7% of revenue | Secondary summaries of Gartner CMO Spend | C |
| S19 | POPIA s.69 opt-in requirement for electronic direct marketing | POPIA / practitioner commentary | A |
| S20 | 273 SA digital marketing agencies listed | GoodFirms | B |
| S21 | SA manufacturing −0.8% Q1 2026; production −2.9% April 2026 | Statistics South Africa | A |
| S22 | DRC copper output +6% forecast 2026 | GlobalData via Yahoo Finance | B |
| S23 | DRC mining revenue audit; FX repatriation; business environment | Ecofin Agency / Coface | A |
| S24 | Engineering News / Mining Weekly 310,000+ weekly digital reach | Creamer Media | B |
| S25 | IRP target 26GW new renewables by 2030 | Secondary (verify against gazetted IRP) | C |
| S26 | ~250,000 formal SMMEs in SA | Small Business Institute (2019) | B, dated |
| S27 | MEMSA mining equipment manufacturer cluster | MEMSA | A |

**Company evidence.** Every company in `data/companies.csv` carries a `source_id` pointing to the search that surfaced it and an `identity_evidence_grade`. No company detail was verified by opening a website or a LinkedIn page. All size bands are marked `ESTIMATED_UNVERIFIED`. All `audit_status` values are `NOT_AUDITED`.

**Competitor evidence.** All grade C. Positioning claims are the agencies' own marketing language as surfaced in search results. No pricing page was opened; no competitor publishes prices in any result seen.

### What to verify before acting on this report

1. **CIDB grade-level breakdown** — the payable-universe estimate in section 5 depends on it and it is currently an assumption
2. **Three competitor quotes** — request real proposals from CubicICE, Shift ONE and one generalist agency to confirm the pricing bands in Table 8
3. **POPIA legal advice** — before any outbound programme
4. **Current AI model and generation pricing** — the section 16 tooling figures are estimates and this pricing moves
5. **The IRP 2025 target** (S25) — verify against the gazetted document before quoting externally
6. **The SA Budget 2026 infrastructure figure** (S08) — verify against the Treasury Budget Review, not a secondary summary
