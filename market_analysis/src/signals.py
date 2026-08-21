"""Signal definitions for the Engineering Digital Opportunity Score.

A "signal" is one observable fact about a prospect. The scoring engine turns
signals into points. Nothing else may contribute to a score - if a fact is not
in this list it cannot move the number, which is what keeps the score auditable.

Each signal records how it can be obtained so that a human filling the sheet in
by hand and a script filling it in automatically agree on what is being asked.
"""

from dataclasses import dataclass
from typing import Any, Literal

Collection = Literal["auto_website", "manual", "manual_or_news", "auto_or_manual"]


@dataclass(frozen=True)
class SignalSpec:
    name: str
    kind: str                 # bool | int | float | str | rating_1_5
    collection: Collection
    required: bool            # counts toward the completeness ratio
    question: str


SIGNALS: tuple[SignalSpec, ...] = (
    # --- capacity -----------------------------------------------------------
    SignalSpec("cidb_grade", "str", "manual", False,
               "CIDB contractor grade 1-9, if registered. Look it up on the public CIDB register."),
    SignalSpec("headcount_estimate", "int", "manual", True,
               "Best estimate of employees. Record the basis in headcount_basis."),
    SignalSpec("headcount_basis", "str", "manual", False,
               "Where the headcount came from: company website, LinkedIn band, news article, or ESTIMATE."),
    SignalSpec("multi_site_operations", "bool", "auto_or_manual", False,
               "Does the company operate from more than one site or country?"),
    SignalSpec("named_blue_chip_clients", "int", "auto_website", True,
               "Count of recognisable major clients named on the site (mines, utilities, listed firms, government)."),
    SignalSpec("flagship_project_value_zar_m", "float", "manual_or_news", False,
               "Value in ZAR millions of the largest project the company publicly claims."),
    SignalSpec("has_marketing_or_comms_person", "bool", "manual", True,
               "Is there a marketing, communications or brand person on LinkedIn or the site?"),
    SignalSpec("has_bd_or_commercial_manager", "bool", "manual", False,
               "Is there a business development or commercial manager?"),
    SignalSpec("owner_reachable_and_decisive", "bool", "manual", False,
               "Is the founder/MD visibly active and likely to decide alone? True for most SMEs."),

    # --- motive -------------------------------------------------------------
    SignalSpec("trigger_type", "str", "manual_or_news", True,
               "Strongest recent business trigger. One of the keys in the scoring config."),
    SignalSpec("trigger_age_months", "float", "manual_or_news", True,
               "How many months ago the trigger happened."),
    SignalSpec("trigger_evidence_url", "str", "manual_or_news", False,
               "Link to the announcement, tender award or article. Required before any outreach."),
    SignalSpec("open_vacancies_count", "int", "manual", False,
               "Open roles advertised on LinkedIn, the site or job boards."),
    SignalSpec("headcount_growth_observed", "bool", "manual", False,
               "Any stated or observable growth in staff numbers."),
    SignalSpec("competitors_publishing_well_count", "int", "manual", False,
               "How many named direct competitors publish good content? Fuel for the sales conversation."),
    SignalSpec("runs_paid_ads", "bool", "manual", False,
               "Evidence of paid advertising: Meta ad library, Google ads, sponsored LinkedIn posts."),
    SignalSpec("exhibits_at_trade_shows", "bool", "manual", False,
               "Listed as an exhibitor at Electra Mining, Africa Energy Indaba, DRC Mining Week, etc."),
    SignalSpec("has_recent_press_release", "bool", "manual_or_news", False,
               "Any press release or trade-press mention in the last 12 months."),
    SignalSpec("site_redesigned_recently", "bool", "auto_or_manual", False,
               "Does the site look like it was rebuilt in the last two years?"),

    # --- gap ----------------------------------------------------------------
    SignalSpec("website_exists", "bool", "auto_website", True,
               "Does a working website resolve?"),
    SignalSpec("site_mobile_responsive", "bool", "auto_website", True,
               "Is there a viewport meta tag and a layout that adapts?"),
    SignalSpec("site_https", "bool", "auto_website", True,
               "Does the site serve over HTTPS with a valid certificate?"),
    SignalSpec("site_last_updated_years", "float", "auto_or_manual", False,
               "Years since the site was visibly updated (copyright year, latest news item)."),
    SignalSpec("site_page_count", "int", "auto_website", False,
               "Number of distinct internal pages reachable from the navigation."),
    SignalSpec("linkedin_posts_last_90_days", "int", "manual", True,
               "Count posts on the company LinkedIn page in the last 90 days. Count by hand - do not scrape LinkedIn."),
    SignalSpec("visual_quality_rating_1_5", "int", "manual", True,
               "1 = poor phone snapshots and clip art, 5 = professional and consistent."),
    SignalSpec("case_studies_count", "int", "auto_website", True,
               "Number of real project case studies (not just a photo gallery)."),
    SignalSpec("project_photography_quality_1_5", "int", "manual", False,
               "1 = poor, 5 = professional."),
    SignalSpec("has_enquiry_form", "bool", "auto_website", True,
               "Is there a working enquiry or quote form?"),
    SignalSpec("has_clear_cta", "bool", "auto_or_manual", False,
               "Is there an obvious next action above the fold?"),
    SignalSpec("has_analytics_installed", "bool", "auto_website", False,
               "Is any analytics tag present (GA4, GTM, Plausible, Matomo)?"),

    # --- bonus / modifiers --------------------------------------------------
    SignalSpec("has_physical_product_or_plant_worth_visualising", "bool", "manual", False,
               "Is there a machine, plant or structure that a 3D model would explain better than a photo?"),
    SignalSpec("sells_configurable_equipment", "bool", "manual", False,
               "Does the company sell equipment with options or variants?"),
    SignalSpec("decision_maker_identified", "bool", "manual", True,
               "Do we have a named person and a lawful way to reach them?"),
    SignalSpec("requires_french_or_offshore_delivery", "bool", "manual", False,
               "Does serving this client need French-language delivery or cross-border payment?"),
)

BY_NAME: dict[str, SignalSpec] = {s.name: s for s in SIGNALS}
REQUIRED = tuple(s.name for s in SIGNALS if s.required)


def blank_sheet() -> dict[str, Any]:
    """An empty signal sheet with every value set to None (meaning 'not observed')."""
    return {s.name: None for s in SIGNALS}
