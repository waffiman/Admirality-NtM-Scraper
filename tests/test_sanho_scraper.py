#!/usr/bin/env python3
"""Unit & integration tests for SANHO NtM scraper and zero-regression UKHO compatibility."""

import os
import sys
import unittest
from unittest import mock

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import sanho_scraper
import scraper_github


SAMPLE_HTML = """
<html><body><ul>
  <li><a href="../notices_mariners/2026_Series/CUMLIST_2026.pdf">Cumulative List</a></li>
  <li><a href="../notices_mariners/2025_Series/00_ANNUAL_2025.pdf">Annual Summary</a></li>
  <li><a href="../notices_mariners/2025_Series/07_JUL%2025%20NTM.pdf">July</a></li>
  <li><a href="../notices_mariners/2025_Series/10_OCT%2026%20NTM.pdf">October</a></li>
</ul></body></html>
"""

SAMPLE_EDITION_TEXT = """
SOUTH AFRICAN
NOTICES TO MARINERS
February 2026 EDITION

Monthly Edition
February 2026
I
TEMPORARY NOTICES AND PRELIMINARY NOTICES
CANCELLED NOTICES
2025 Series
77(T)/25

TEMPORARY NOTICES
2026 Series
28(T)/26 Namibia Offshore Walvis Bay Wreck.
Chart 73 (INT 2610), 90 (INT 2051), 1005 (INT 2613)
99(P)/26 RSA Port Nolloth Survey Operations.
Chart SAN 1003

Monthly Edition
February 2026
II
SAN NOTICES TO MARINERS. UPDATES TO STANDARD NAVIGATIONAL CHARTS
28(T)/26* NAMIBIA – Offshore Walvis Bay – Wreck.
Source: National Hydrographer (Previously issued as NTM 77(T)/25)
SAN 73 (INT 2610) [Previous Update – 30/23]
SAN 1005 (INT 2613) [Previous Update – 78/25]
1. Insert: in approximate position 22° 47.18' S 014° 26.57' E
(SAN 73, 1005)

29(T)/26* NAMIBIA – Walvis Bay Approaches – Oyster Lines and Buoys.
SAN 1005 (INT 2613) [Previous Update – 78/25]
1. Oyster lines moored between the following positions Line 1 a. 22° 55.417' S 014° 24.866' E
b. 22° 55.290' S 0 14° 24.874' E
Line 2 a. 22° 55.417' S 014° 25.042' E
b. 22° 55.290' S 0 14° 25.042' E

Monthly Edition
February 2026
I cont/…
62(T)/26* SOUTH AFRICA – East Coast – Port of Richards Bay– Depths.
SAN 1033 (INT 7571) [Previous Update – 51/13]
1. Insert: Depth in positions: a. 28° 48.363' S 032° 03.540' E
b. 28° 48.433' S 032° 03.382' E

Monthly Edition
February 2026
IV
CORRECTIONS TO HO PUBLICATIONS
72/26 SOUTH AFRICA – SAILING DIRECTIONS (SAN HO-21)
1. Amend: Page 42, insert caution off Mossel Bay 34° 11.40' S 022° 09.50' E

Monthly Edition
February 2026
V
CORRECTIONS TO SA LIST OF LIGHTS AND RADIO SIGNALS – SAN HO-1
73(T)/26* SA LIST OF LIGHTS AND RADIO SIGNALS (SAN HO-1) 2025 EDITION
1. Cape Columbine Light Z6000, in approximate position: 33° 00.0' S 019° 00.0' E
Delete: light characteristic
Insert: Fl(3)15s
"""

SAMPLE_UKHO_TEXT = """
Weekly Edition 42 October 2026
4201(T)/26 ENGLAND - East Coast - Buoy. Depths.
1. Insert: green conical buoy Fl.G.5s in 51° 45.20' N., 001° 25.40' E.
Charts affected — 1183 — 1610
"""


class SanhoScraperTests(unittest.TestCase):
    def test_discover_links_resolves_relative_and_fallback_series(self):
        links = sanho_scraper.discover_sanho_pdf_links(SAMPLE_HTML)
        oct26 = next(x for x in links if x["filename"] == "10_OCT 26 NTM.pdf")
        self.assertEqual(oct26["url"], "https://www.sanho.co.za/notices_mariners/2025_Series/10_OCT%2026%20NTM.pdf")
        self.assertEqual(oct26["fallbackUrl"], "https://www.sanho.co.za/notices_mariners/2026_Series/10_OCT%2026%20NTM.pdf")
        self.assertEqual((oct26["year"], oct26["month"], oct26["monthName"]), (2026, 10, "October"))

    def test_parse_sections_i_ii_iv_v_and_typos(self):
        parsed = sanho_scraper.parse_sanho_edition_text(SAMPLE_EDITION_TEXT)
        by_id = {n["id"]: n for n in parsed["notices"]}

        # Prefixed IDs prevent collision with UKHO notices
        self.assertIn("SANHO 28(T)/26", by_id)
        n28 = by_id["SANHO 28(T)/26"]
        self.assertEqual(n28["authority"], "SANHO")
        self.assertEqual(n28["source"], "SANHO")
        self.assertEqual(n28["navarea"], "VII")
        self.assertEqual(n28["noticeNumber"], "28(T)/26*")
        self.assertTrue(n28["isOriginal"])
        self.assertTrue(n28["isTemp"])
        self.assertEqual(n28["country"], "NAMIBIA")
        self.assertIn("SAN 73", n28["charts"])
        self.assertIn("INT 2610", n28["charts"])
        self.assertAlmostEqual(n28["coords"][0]["lat"], -22.78633, places=4)
        self.assertAlmostEqual(n28["coords"][0]["lon"], 14.44283, places=4)
        self.assertEqual(n28["actions"], ["Insert"])
        self.assertEqual(n28["edition"]["year"], 2026)
        self.assertEqual(n28["edition"]["month"], 2)

        # Kerning space in degree "0 14°" and separate subPolygons lines
        n29 = by_id["SANHO 29(T)/26"]
        self.assertEqual(len(n29["coords"]), 4)
        self.assertTrue(n29["isLine"])
        self.assertEqual(len(n29.get("subPolygons", [])), 2)

        # Notice after SANHO "I cont/..." typesetter typo inside Section II still parses in Section II
        n62 = by_id["SANHO 62(T)/26"]
        self.assertEqual(n62["section"], "II")
        self.assertEqual(n62["subject"], "Depths")
        self.assertEqual(len(n62["coords"]), 2)

        # Section I preliminary notice + cancellations preserved
        self.assertIn("SANHO 99(P)/26", by_id)
        self.assertTrue(by_id["SANHO 99(P)/26"]["isPrelim"])
        self.assertIn("SANHO 77(T)/25", parsed["cancelledIds"])

        # Section IV & Section V publication updates
        self.assertIn("SANHO 72/26", by_id)
        self.assertEqual(by_id["SANHO 72/26"]["section"], "IV")
        self.assertIn("SAN HO-21", by_id["SANHO 72/26"]["charts"])
        self.assertIn("SANHO 73(T)/26", by_id)
        self.assertEqual(by_id["SANHO 73(T)/26"]["section"], "V")
        self.assertIn("SAN HO-1", by_id["SANHO 73(T)/26"]["charts"])
        self.assertEqual(by_id["SANHO 73(T)/26"]["actions"], ["Delete", "Insert"])

    def test_fault_isolation_unreachable_host(self):
        with mock.patch("sanho_scraper._http_get_bytes", side_effect=OSError("Connection timed out")):
            res = sanho_scraper.scrape_sanho_notices()
        self.assertEqual(res["notices"], [])
        self.assertIn("Connection timed out", res["error"])

    def test_ukho_parser_zero_regression(self):
        ukho = scraper_github.parse_admiralty_ntm_text(SAMPLE_UKHO_TEXT, default_year="26")
        self.assertEqual(len(ukho["notices"]), 1)
        u = ukho["notices"][0]
        self.assertEqual(u["id"], "4201(T)/26")
        self.assertNotIn("authority", u)
        self.assertEqual(u["type"], "T")
        self.assertAlmostEqual(u["coords"][0]["lat"], 51.75333, places=4)


if __name__ == "__main__":
    unittest.main(verbosity=2)
