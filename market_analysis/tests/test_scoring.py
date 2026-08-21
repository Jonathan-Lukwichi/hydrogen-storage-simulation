"""Tests for the EDOS scoring engine.

Run:  python3 -m pytest tests -q      (or: python3 tests/test_scoring.py)
"""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "src"))

from signals import blank_sheet, REQUIRED          # noqa: E402
from scoring import score_company, load_config     # noqa: E402

CFG = load_config()


def _ideal_prospect() -> dict:
    """Successful, growing, digitally weak, with a fresh trigger and a decision maker."""
    s = blank_sheet()
    s.update(
        cidb_grade="8", headcount_estimate=120, multi_site_operations=True,
        named_blue_chip_clients=4, flagship_project_value_zar_m=180.0,
        has_marketing_or_comms_person=False, has_bd_or_commercial_manager=True,
        owner_reachable_and_decisive=True,
        trigger_type="major_contract_award", trigger_age_months=2,
        open_vacancies_count=6, headcount_growth_observed=True,
        competitors_publishing_well_count=3,
        runs_paid_ads=False, exhibits_at_trade_shows=True,
        has_recent_press_release=True, site_redesigned_recently=False,
        website_exists=True, site_mobile_responsive=False, site_https=True,
        site_last_updated_years=4, site_page_count=5,
        linkedin_posts_last_90_days=1, visual_quality_rating_1_5=2,
        case_studies_count=0, project_photography_quality_1_5=2,
        has_enquiry_form=True, has_clear_cta=False, has_analytics_installed=False,
        has_physical_product_or_plant_worth_visualising=True,
        sells_configurable_equipment=False,
        decision_maker_identified=True, requires_french_or_offshore_delivery=False,
    )
    return s


def _indifferent_prospect() -> dict:
    """Huge digital gap but zero evidence anyone cares. The trap the score must avoid."""
    s = blank_sheet()
    s.update(
        cidb_grade="6", headcount_estimate=45, multi_site_operations=False,
        named_blue_chip_clients=1, flagship_project_value_zar_m=8.0,
        has_marketing_or_comms_person=False, has_bd_or_commercial_manager=False,
        owner_reachable_and_decisive=True,
        trigger_type="none_found", trigger_age_months=0,
        open_vacancies_count=0, headcount_growth_observed=False,
        competitors_publishing_well_count=0,
        runs_paid_ads=False, exhibits_at_trade_shows=False,
        has_recent_press_release=False, site_redesigned_recently=False,
        website_exists=False, site_mobile_responsive=False, site_https=False,
        site_last_updated_years=8, site_page_count=1,
        linkedin_posts_last_90_days=0, visual_quality_rating_1_5=1,
        case_studies_count=0, project_photography_quality_1_5=1,
        has_enquiry_form=False, has_clear_cta=False, has_analytics_installed=False,
        has_physical_product_or_plant_worth_visualising=False,
        sells_configurable_equipment=False,
        decision_maker_identified=True, requires_french_or_offshore_delivery=False,
    )
    return s


def _already_good() -> dict:
    """Capable, growing, and already publishing well. Little for us to add."""
    s = _ideal_prospect()
    s.update(
        website_exists=True, site_mobile_responsive=True, site_https=True,
        site_last_updated_years=0, site_page_count=40,
        linkedin_posts_last_90_days=30, visual_quality_rating_1_5=5,
        case_studies_count=25, project_photography_quality_1_5=5,
        has_enquiry_form=True, has_clear_cta=True, has_analytics_installed=True,
        runs_paid_ads=True,
    )
    return s


def test_ideal_prospect_lands_in_top_tiers():
    r = score_company(_ideal_prospect(), "T1", "Ideal Engineering")
    assert r.score >= 70, r.score
    assert r.band in ("A", "B")
    assert r.actionable


def test_intent_gate_demotes_the_big_gap_no_motive_company():
    r = score_company(_indifferent_prospect(), "T2", "Indifferent Works")
    assert any("intent_gate" in m for m in r.modifiers_applied)
    ideal = score_company(_ideal_prospect(), "T1", "Ideal Engineering")
    assert r.score < ideal.score
    assert r.band in ("C", "D", "E"), (r.score, r.band)


def test_already_good_company_scores_below_the_gappy_one():
    good = score_company(_already_good(), "T3", "Already Good Pty")
    ideal = score_company(_ideal_prospect(), "T1", "Ideal Engineering")
    assert good.score < ideal.score, (good.score, ideal.score)


def test_gap_group_is_capped_at_forty():
    r = score_company(_indifferent_prospect(), "T2", "Indifferent Works")
    assert r.group_totals["gap"] <= 40.0
    assert r.group_totals["capacity"] <= 30.0
    assert r.group_totals["motive"] <= 30.0


def test_empty_sheet_is_not_actionable_and_scores_zero_ish():
    r = score_company(blank_sheet(), "T0", "Unknown Co")
    assert r.completeness == 0.0
    assert not r.actionable
    assert r.score == 0.0


def test_completeness_tracks_required_signals():
    s = blank_sheet()
    for name in list(REQUIRED)[:7]:
        s[name] = 1
    r = score_company(s, "T4", "Half Known")
    assert 0.4 < r.completeness < 0.7


def test_trigger_recency_decays():
    fresh = _ideal_prospect()
    stale = _ideal_prospect()
    stale["trigger_age_months"] = 18
    assert score_company(stale).score < score_company(fresh).score


def test_score_is_bounded():
    for sheet in (_ideal_prospect(), _indifferent_prospect(), _already_good(), blank_sheet()):
        r = score_company(sheet)
        assert 0.0 <= r.score <= 100.0


if __name__ == "__main__":
    import traceback
    fns = [v for k, v in sorted(globals().items()) if k.startswith("test_")]
    failed = 0
    for fn in fns:
        try:
            fn()
            print(f"PASS {fn.__name__}")
        except Exception:
            failed += 1
            print(f"FAIL {fn.__name__}")
            traceback.print_exc()
    print(f"\n{len(fns) - failed}/{len(fns)} passed")
    sys.exit(1 if failed else 0)
