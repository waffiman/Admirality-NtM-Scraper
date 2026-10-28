# -*- coding: utf-8 -*-
import re
from pathlib import Path

HOME_FORM = r'''                    <div class="vessel-profile-fields" data-vessel-form="home">
                      <div class="vessel-primary-fields">
                        <div class="form-group vessel-name-group" style="margin-bottom:0.45rem;position:relative;">
                          <label for="homeVesselName">Vessel Name</label>
                          <input type="text" id="homeVesselName" class="min-input vessel-field-name" placeholder="Type to search AIS…" autocomplete="off" />
                          <div class="vessel-ais-suggest" id="homeVesselAisSuggest" hidden></div>
                        </div>
                        <div class="ntm-popover-subtitle">Position</div>
                        <div class="vessel-coords-row">
                          <div class="form-group" style="flex:1;margin-bottom:0;">
                            <label for="homeVesselLat">Latitude</label>
                            <input type="text" id="homeVesselLat" class="min-input vessel-field-lat" placeholder="58° 37.7' N" />
                          </div>
                          <div class="form-group" style="flex:1;margin-bottom:0;">
                            <label for="homeVesselLon">Longitude</label>
                            <input type="text" id="homeVesselLon" class="min-input vessel-field-lon" placeholder="017° 46.3' E" />
                          </div>
                          <button type="button" class="ntm-btn-glass vessel-gps-btn" id="homeVesselGpsBtn" title="Use browser GPS">GPS</button>
                        </div>
                      </div>
                      <details class="vessel-more-details">
                        <summary>More vessel details</summary>
                        <div class="form-group" style="margin-bottom:0.45rem;">
                          <label for="homeVesselCallSign">Call Sign</label>
                          <input type="text" id="homeVesselCallSign" class="min-input vessel-field-callsign" placeholder="e.g. 3EAB9" />
                        </div>
                        <div class="ntm-popover-subtitle">AIS Details</div>
                        <div class="vessel-ais-grid">
                          <div class="form-group"><label for="homeVesselMmsi">MMSI <span style="opacity:.65;font-weight:500;">(Enter = lookup)</span></label><input type="text" id="homeVesselMmsi" class="min-input vessel-field-mmsi" placeholder="e.g. 636024827" title="Type MMSI and press Enter to search AIS" /></div>
                          <div class="form-group"><label for="homeVesselType">Ship Type</label><input type="text" id="homeVesselType" class="min-input vessel-field-type" /></div>
                          <div class="form-group vessel-span2"><label for="homeVesselDest">Destination</label><input type="text" id="homeVesselDest" class="min-input vessel-field-dest" /></div>
                          <div class="form-group"><label for="homeVesselSog">SOG (kn)</label><input type="text" id="homeVesselSog" class="min-input vessel-field-sog" /></div>
                          <div class="form-group"><label for="homeVesselCog">COG (°)</label><input type="text" id="homeVesselCog" class="min-input vessel-field-cog" /></div>
                          <div class="form-group"><label for="homeVesselHeading">Heading (°)</label><input type="text" id="homeVesselHeading" class="min-input vessel-field-heading" /></div>
                        </div>
                      </details>
                      <div style="display:flex;gap:0.4rem;justify-content:flex-end;margin-top:0.55rem;">
                        <button type="button" class="ntm-btn-glass" id="homeVesselClearBtn" style="color:var(--warn);margin-right:auto;font-size:0.72rem;padding:0.3rem 0.55rem;">Clear</button>
                        <button type="button" class="ntm-btn-primary" id="homeVesselApplyBtn" style="font-size:0.75rem;padding:0.35rem 0.7rem;">Save</button>
                      </div>
                    </div>'''

CHART_FORM = r'''                                    <div class="vessel-profile-fields" data-vessel-form="chart">
                      <div class="vessel-primary-fields">
                        <div class="form-group vessel-name-group" style="margin-bottom:0.45rem;position:relative;">
                          <label for="vesselName">Vessel Name</label>
                          <input type="text" id="vesselName" class="min-input vessel-field-name" placeholder="Type to search AIS…" autocomplete="off" />
                          <div class="vessel-ais-suggest" id="vesselAisSuggest" hidden></div>
                        </div>
                        <div class="ntm-popover-subtitle">Position</div>
                        <div class="vessel-coords-row">
                          <div class="form-group" style="flex:1;margin-bottom:0;">
                            <label for="vesselLat">Latitude</label>
                            <input type="text" id="vesselLat" class="min-input vessel-field-lat" placeholder="e.g. 58° 37.7' N" />
                          </div>
                          <div class="form-group" style="flex:1;margin-bottom:0;">
                            <label for="vesselLon">Longitude</label>
                            <input type="text" id="vesselLon" class="min-input vessel-field-lon" placeholder="e.g. 017° 46.3' E" />
                          </div>
                          <button type="button" class="ntm-btn-glass vessel-gps-btn" id="vesselFetchGpsBtn" title="Use browser GPS">GPS</button>
                        </div>
                      </div>
                      <details class="vessel-more-details">
                        <summary>More vessel details</summary>
                        <div class="form-group" style="margin-bottom:0.45rem;">
                          <label for="vesselCallSign">Call Sign</label>
                          <input type="text" id="vesselCallSign" class="min-input vessel-field-callsign" placeholder="e.g. 3EAB9" />
                        </div>
                        <div class="ntm-popover-subtitle">AIS Details</div>
                        <div class="vessel-ais-grid">
                          <div class="form-group"><label for="vesselMmsi">MMSI <span style="opacity:.65;font-weight:500;">(Enter = lookup)</span></label><input type="text" id="vesselMmsi" class="min-input vessel-field-mmsi" placeholder="e.g. 636024827" title="Type MMSI and press Enter to search AIS" /></div>
                          <div class="form-group"><label for="vesselType">Ship Type</label><input type="text" id="vesselType" class="min-input vessel-field-type" /></div>
                          <div class="form-group vessel-span2"><label for="vesselDest">Destination</label><input type="text" id="vesselDest" class="min-input vessel-field-dest" /></div>
                          <div class="form-group"><label for="vesselSog">SOG (kn)</label><input type="text" id="vesselSog" class="min-input vessel-field-sog" /></div>
                          <div class="form-group"><label for="vesselCog">COG (°)</label><input type="text" id="vesselCog" class="min-input vessel-field-cog" /></div>
                          <div class="form-group"><label for="vesselHeading">Heading (°)</label><input type="text" id="vesselHeading" class="min-input vessel-field-heading" /></div>
                        </div>
                      </details>
                      <div style="display:flex;gap:0.4rem;justify-content:flex-end;margin-top:0.55rem;">
                        <button type="button" class="ntm-btn-glass" id="vesselClearBtn" style="color:var(--warn);margin-right:auto;display:none;font-size:0.72rem;padding:0.3rem 0.55rem;">Clear</button>
                        <button type="button" class="ntm-btn-primary" id="vesselApplyBtn" style="font-size:0.75rem;padding:0.35rem 0.7rem;">Save &amp; Plot</button>
                      </div>
                  </div>'''


def patch(path: Path):
    t = path.read_text(encoding="utf-8")
    m = re.search(
        r'<div class="vessel-profile-fields" data-vessel-form="home">.*?'
        r'<button type="button" class="ntm-btn-primary" id="homeVesselApplyBtn"[^>]*>Save</button>\s*</div>\s*</div>',
        t,
        re.S,
    )
    if not m:
        print(path, "HOME FAIL")
        return False
    t = t[: m.start()] + HOME_FORM + t[m.end() :]
    print(path, "home ok")

    m2 = re.search(
        r'<div class="vessel-profile-fields" data-vessel-form="chart">.*?'
        r'<button type="button" class="ntm-btn-primary" id="vesselApplyBtn"[^>]*>Save &amp; Plot</button>\s*</div>\s*</div>',
        t,
        re.S,
    )
    if not m2:
        print(path, "CHART FAIL")
        path.write_text(t, encoding="utf-8", newline="\n")
        return False
    t = t[: m2.start()] + CHART_FORM + t[m2.end() :]
    print(path, "chart ok")
    path.write_text(t, encoding="utf-8", newline="\n")
    return True


for rel in ("index.html", "OPEN_SETSAIL.html", "public/index.html", "public/OPEN_SETSAIL.html"):
    p = Path(rel)
    if p.exists():
        patch(p)
