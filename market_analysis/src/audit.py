"""Website signal collector.

Fills in the signals marked `auto_website` in signals.py by fetching a
prospect's public homepage. Everything else stays manual.

Deliberate limits
-----------------
* robots.txt is honoured. If a site disallows the path, the collector records
  BLOCKED and moves on.
* LinkedIn is never fetched. Its terms forbid automated collection and it
  blocks it anyway. LinkedIn signals are counted by hand - see signals.py.
* One request per host, a real User-Agent that identifies the operator, and a
  polite delay. This is a prospecting aid, not a crawler.

This module needs network access. It will not run inside a sandboxed session
with a blocked egress proxy - run it from your own machine.

    pip install requests beautifulsoup4
"""

from __future__ import annotations

import re
import time
import urllib.parse
import urllib.robotparser
from datetime import datetime
from typing import Any

USER_AGENT = "EDOS-prospect-audit/1.0 (+business research; contact: you@yourdomain.co.za)"
REQUEST_DELAY_SECONDS = 2.0
TIMEOUT = 15

CASE_STUDY_HINTS = ("case-stud", "case stud", "our-projects", "our projects",
                    "project-detail", "portfolio", "references", "success-stor")
ANALYTICS_HINTS = ("googletagmanager.com", "google-analytics.com", "gtag(",
                   "plausible.io", "matomo", "hotjar", "clarity.ms")
FORM_HINTS = ("<form", "type=\"email\"", "type='email'", "mailto:")
CTA_WORDS = ("request a quote", "get a quote", "contact us", "enquire",
             "book a call", "request a callback", "speak to", "get in touch")


def _robots_allows(url: str) -> bool:
    parts = urllib.parse.urlparse(url)
    robots_url = f"{parts.scheme}://{parts.netloc}/robots.txt"
    rp = urllib.robotparser.RobotFileParser()
    rp.set_url(robots_url)
    try:
        rp.read()
    except Exception:
        return True          # no readable robots.txt means no stated restriction
    return rp.can_fetch(USER_AGENT, url)


def audit_website(url: str) -> dict[str, Any]:
    """Return the subset of signals that a homepage fetch can honestly support."""
    import requests
    from bs4 import BeautifulSoup

    out: dict[str, Any] = {"_audit_url": url, "_audit_at": datetime.utcnow().isoformat(timespec="seconds")}

    if not url:
        out.update(website_exists=False, _audit_status="NO_URL")
        return out

    if not url.startswith(("http://", "https://")):
        url = "https://" + url

    if not _robots_allows(url):
        out["_audit_status"] = "BLOCKED_BY_ROBOTS"
        return out

    try:
        resp = requests.get(url, headers={"User-Agent": USER_AGENT}, timeout=TIMEOUT, allow_redirects=True)
    except Exception as exc:                                   # noqa: BLE001
        out.update(website_exists=False, _audit_status=f"UNREACHABLE: {type(exc).__name__}")
        return out
    finally:
        time.sleep(REQUEST_DELAY_SECONDS)

    if resp.status_code >= 400:
        out.update(website_exists=False, _audit_status=f"HTTP_{resp.status_code}")
        return out

    html = resp.text
    lowered = html.lower()
    soup = BeautifulSoup(html, "html.parser")

    out["website_exists"] = True
    out["site_https"] = resp.url.startswith("https://")
    out["site_mobile_responsive"] = bool(soup.find("meta", attrs={"name": "viewport"}))
    out["has_analytics_installed"] = any(hint in lowered for hint in ANALYTICS_HINTS)
    out["has_enquiry_form"] = any(hint in lowered for hint in FORM_HINTS)
    out["has_clear_cta"] = any(word in lowered for word in CTA_WORDS)

    # internal links give a rough page count
    host = urllib.parse.urlparse(resp.url).netloc
    internal = set()
    for anchor in soup.find_all("a", href=True):
        href = urllib.parse.urljoin(resp.url, anchor["href"])
        parsed = urllib.parse.urlparse(href)
        if parsed.netloc == host and parsed.path not in ("", "/"):
            internal.add(parsed.path.rstrip("/"))
    out["site_page_count"] = len(internal)

    # case studies: count distinct internal paths that look like project write-ups
    out["case_studies_count"] = sum(
        1 for path in internal if any(hint in path.lower() for hint in CASE_STUDY_HINTS)
    )

    # copyright year is the cheapest honest proxy for "last touched"
    years = [int(y) for y in re.findall(r"(?:©|&copy;|copyright)[^0-9]{0,20}(20\d{2})", lowered)]
    if years:
        out["site_last_updated_years"] = max(0, datetime.utcnow().year - max(years))

    out["_audit_status"] = "OK"
    out["_notes"] = ("case_studies_count and site_page_count are homepage-navigation estimates. "
                     "Confirm by eye before using them in a pitch.")
    return out


def audit_many(rows: list[dict[str, str]], url_field: str = "website") -> list[dict[str, Any]]:
    results = []
    for row in rows:
        signals = audit_website(row.get(url_field, ""))
        signals["company_id"] = row.get("company_id", "")
        signals["company_name"] = row.get("company_name", "")
        results.append(signals)
        print(f"  {row.get('company_name','?'):45s} {signals.get('_audit_status')}")
    return results
