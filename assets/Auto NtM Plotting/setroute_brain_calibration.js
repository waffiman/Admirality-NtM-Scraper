/**
 * SetRoute Route Planning Brain — Nautical Corridor, Fairway & Topology Calibration (v5.244)
 *
 * Root causes resolved from RTZ / JRC CSV passage plan audit:
 * 1. Coarse 0.5-deg (30 NM) land-mask & Iberia-W land-box false positives over narrow international
 *    straits and canals (Gibraltar, Suez Canal, Gulf of Suez, Bab-el-Mandeb, Singapore & Malacca Straits,
 *    Dover/English Channel, German Bight, Osumi/Taiwan Straits, Sunda/Karimata/Gaspar Straits), which
 *    previously assigned depth = 0m (+65,000 NM penalty) or TSS hard-ban (+45,000..428,000 NM penalty)
 *    and forced "Via Suez Canal" routes to U-turn and sail around the Cape of Good Hope.
 * 2. Out-and-back dead-end spurs in setroutePathViaNode / setroutePathViaNodeAsync (e.g. Salalah ->
 *    Cape Agulhas -> back to Sunda Strait -> San Francisco, adding +9,000 NM of 180-deg reversal).
 * 3. Unbounded +1,400 NM detour allowance in setrouteFindSeaNodeBypass / setrouteSurgicalRepairWaypoints
 *    that created 600 NM 180-deg yo-yo loops to SCS_MID (10.0N, 110.5E) in the South China Sea and
 *    250 NM northward spikes to NORTH_SEA_MID (56.2N, 3.5E) before Hamburg.
 * 4. Raw node-concatenation in setrouteStitchTemplateCorridor that connected non-adjacent template
 *    milestones across continents without intermediate shortest-sea path stitching.
 * 5. Arabian Sea / NW Indian Ocean -> US West Coast (e.g. Salalah -> San Francisco & Oakland) missing
 *    from Eastbound Malacca + North Pacific Great Circle corridor selection, falling into "Via Cape — auto".
 * 6. Excessive micro-waypoint clustering ("Turn ease 1/7 .. 9/9" -> "17..99" in RTZ) at sharp vertices.
 */
(function () {
  "use strict";

  if (typeof window === "undefined") return;

  // ---------------------------------------------------------------------------
  // 1. CALIBRATE STRATEGIC SEA NODES, EDGES & LAND BOXES
  // ---------------------------------------------------------------------------
  var EXTRA_SEA_NODES = {
    GERMAN_BIGHT_TSS:  [53.92, 5.05, "Terschelling / German Bight West TSS"],
    BREMERHAVEN_APP:   [53.96, 7.65, "German Bight East / Weser Approach TSS"],
    NATUNA_CORRIDOR:   [1.85, 105.65, "Anambas / Natuna Sea Deepwater Corridor"],
    KARIMATA_STRAIT:   [-1.80, 107.05, "Karimata / Gaspar Approach Fairway"],
    OKINAWA_SE:        [25.50, 128.80, "Philippine Sea East of Okinawa"],
    NOJIMAZAKI_OFF:    [34.65, 140.45, "Nojimazaki SE Pacific Separation Offshore"],
    CAPE_VERDE_PASS:   [15.20, -26.20, "Cape Verde West Deepsea Corridor"],
    CAPE_POINT_W:      [-34.40, 18.00, "Cape Point West Offshore Approach"],
    WALVIS_OFF:        [-22.50, 11.50, "Walvis Ridge / Namibia Deepwater Route"],
    ST_HELENA_E:       [-12.00, -4.00, "South-East Atlantic Deepwater Lane"],
    RAS_AL_HADD_OFF:   [22.55, 60.45, "Ras al Hadd Offshore Fairway"],
    GULF_OF_OMAN:      [24.50, 58.95, "Gulf of Oman Deepwater Lane"],
    CAPE_CANAVERAL_OFF:[28.50, -79.75, "Gulf Stream / Cape Canaveral Offshore"],
    GREAT_ISAAC_N:     [26.30, -79.60, "Straits of Florida North Approach"],
    GABO_ISLAND:       [-37.80, 150.25, "Gabo Island / Bass Strait East TSS"],
    BASS_STRAIT_W:     [-39.25, 143.40, "King Island South / Bass Strait West TSS"],
    KANGAROO_IS_S:     [-36.50, 136.50, "Investigator / Kangaroo Island South"],
    CAPE_LEEUWIN:      [-34.65, 114.70, "Cape Leeuwin Deepwater Corridor"],
    NORTH_WEST_CAPE:   [-21.50, 113.70, "North West Cape / Exmouth Offshore"],
    JAVA_SEA_W:        [-5.10, 108.40, "West Java Sea Deepwater Fairway"],
    JAVA_SEA_E:        [-6.80, 114.20, "East Java Sea / Kangean Fairway"],
    CORAL_SEA_S:       [-24.00, 153.80, "Fraser Island / Sandy Cape Offshore"],
    CORAL_SEA_N:       [-14.50, 146.50, "Coral Sea / Grafton Passage Offshore"],
    TORRES_STRAIT:     [-10.55, 142.15, "Prince of Wales Channel / Torres Strait"],
    ARAFURA_SEA:       [-9.20, 132.00, "Arafura / Timor Deepwater Route"],
    WETAR_STRAIT:      [-8.20, 126.20, "Wetar / Ombai Deepwater Passage"]
  };

  var EXTRA_SEA_EDGES = [
    ["ROTTERDAM_APP", "GERMAN_BIGHT_TSS"],
    ["DOVER_STRAIT", "GERMAN_BIGHT_TSS"],
    ["GERMAN_BIGHT_TSS", "BREMERHAVEN_APP"],
    ["BREMERHAVEN_APP", "HAMBURG_APP"],
    ["SINGAPORE_E", "NATUNA_CORRIDOR"],
    ["NATUNA_CORRIDOR", "SCS_SOUTH"],
    ["NATUNA_CORRIDOR", "SCS_MID"],
    ["NATUNA_CORRIDOR", "KARIMATA_STRAIT"],
    ["KARIMATA_STRAIT", "GASPAR_STRAIT"],
    ["GASPAR_STRAIT", "JAVA_SEA_W"],
    ["JAVA_SEA_W", "JAVA_SEA_E"],
    ["JAVA_SEA_E", "LOMBOK_STRAIT"],
    ["SALALAH_APP", "ARABIAN_SEA_MID"],
    ["SALALAH_APP", "GULF_OF_ADEN"],
    ["ARABIAN_SEA_MID", "SIX_DEGREE_CH"],
    ["GULF_OF_OMAN", "RAS_AL_HADD_OFF"],
    ["RAS_AL_HADD_OFF", "ARABIAN_SEA_MID"],
    ["LUZON_STRAIT", "OKINAWA_SE"],
    ["OKINAWA_SE", "SHIONOMISAKI_OFF"],
    ["SHIONOMISAKI_OFF", "IZU_OSHIMA_S"],
    ["IZU_OSHIMA_S", "NOJIMAZAKI_OFF"],
    ["NOJIMAZAKI_OFF", "NPAC_GC_WEST"],
    ["TOKYO_APP", "NOJIMAZAKI_OFF"],
    ["OSUMI_STRAIT", "SHIONOMISAKI_OFF"],
    ["NPAC_GC_EAST", "SAN_FRANCISCO_APP"],
    ["NPAC_GC_MID", "SAN_FRANCISCO_APP"],
    ["CAPE_TOWN_APP", "CAPE_POINT_W"],
    ["CAPE_TOWN_APP", "WALVIS_OFF"],
    ["CAPE_POINT_W", "CAPE_AGULHAS"],
    ["CAPE_POINT_W", "WALVIS_OFF"],
    ["WALVIS_OFF", "SOUTH_ATLANTIC_MID"],
    ["SOUTH_ATLANTIC_MID", "ST_HELENA_E"],
    ["ST_HELENA_E", "CAPE_VERDE_PASS"],
    ["CAPE_VERDE_PASS", "CANARY_PASS"],
    ["CANARY_PASS", "ST_VINCENT"],
    ["SAVANNAH_APP", "CAPE_CANAVERAL_OFF"],
    ["CAPE_CANAVERAL_OFF", "GREAT_ISAAC_N"],
    ["GREAT_ISAAC_N", "FLORIDA_STRAIT"],
    ["SYDNEY_APP", "GABO_ISLAND"],
    ["GABO_ISLAND", "BASS_STRAIT_W"],
    ["BASS_STRAIT_W", "MELBOURNE_APP"],
    ["BASS_STRAIT_W", "KANGAROO_IS_S"],
    ["KANGAROO_IS_S", "CAPE_LEEUWIN"],
    ["CAPE_LEEUWIN", "FREMANTLE_APP"],
    ["FREMANTLE_APP", "NORTH_WEST_CAPE"],
    ["NORTH_WEST_CAPE", "HEDLAND_APP"],
    ["NORTH_WEST_CAPE", "LOMBOK_STRAIT"],
    ["NORTH_WEST_CAPE", "SUNDA_STRAIT"],
    ["SYDNEY_APP", "CORAL_SEA_S"],
    ["CORAL_SEA_S", "BRISBANE_APP"],
    ["CORAL_SEA_S", "CORAL_SEA_N"],
    ["CORAL_SEA_N", "TORRES_STRAIT"],
    ["TORRES_STRAIT", "ARAFURA_SEA"],
    ["ARAFURA_SEA", "WETAR_STRAIT"],
    ["WETAR_STRAIT", "LOMBOK_STRAIT"],
    ["ARAFURA_SEA", "LOMBOK_STRAIT"]
  ];

  // Remove overland shortcut chords that previously triggered wetPathLattice staircases & surgical yo-yo detours
  var BAD_LAND_CUT_EDGES = {
    "BREMERHAVEN_APP|ROTTERDAM_APP": true,
    "HAMBURG_APP|ROTTERDAM_APP": true,
    "SCS_SOUTH|SUNDA_STRAIT": true,
    "JAKARTA_APP|SINGAPORE_E": true,
    "GASPAR_STRAIT|SINGAPORE_E": true,
    "GASPAR_STRAIT|SCS_SOUTH": true,
    "LOMBOK_STRAIT|SINGAPORE_E": true,
    "LOMBOK_STRAIT|SCS_SOUTH": true,
    "LOMBOK_STRAIT|MANILA_APP": true,
    "LOMBOK_STRAIT|SIX_DEGREE_CH": true,
    "LOMBOK_STRAIT|SUNDA_STRAIT": true,
    "JAKARTA_APP|LOMBOK_STRAIT": true,
    "ADRIATIC_MID|GENOA_APP": true,
    "BRISBANE_APP|MANILA_APP": true,
    "BRISBANE_APP|OSUMI_STRAIT": true,
    "BRISBANE_APP|TOKYO_APP": true,
    "HEDLAND_APP|SYDNEY_APP": true,
    "FREMANTLE_APP|MELBOURNE_APP": true,
    "MELBOURNE_APP|SYDNEY_APP": true,
    "FREMANTLE_APP|HEDLAND_APP": true,
    "BRISBANE_APP|SYDNEY_APP": true,
    "ARABIAN_SEA_MID|GULF_OF_OMAN": true,
    "FLORIDA_STRAIT|SAVANNAH_APP": true,
    "CAPE_AGULHAS|SOUTH_ATLANTIC_MID": true,
    "CAPE_TOWN_APP|SOUTH_ATLANTIC_MID": true,
    "CAPE_TOWN_APP|LUANDA_APP": true,
    "CAPE_VERDE_PASS|SOUTH_ATLANTIC_MID": true
  };

  // Authoritative curated navigable fairways & chokepoints (charted min depth in meters, corridor half-width NM)
  var CURATED_FAIRWAY_EDGES = {
    // Gibraltar & Western Europe Spine
    "ST_VINCENT|GIBRALTAR_W": { depthM: 45, widthNM: 28 },
    "GIBRALTAR_W|GIBRALTAR_MID": { depthM: 38, widthNM: 18 },
    "GIBRALTAR_MID|GIBRALTAR_E": { depthM: 42, widthNM: 18 },
    "GIBRALTAR_E|MED_WEST": { depthM: 60, widthNM: 28 },
    "GIBRALTAR_E|ALBORAN_MID": { depthM: 60, widthNM: 28 },
    "ALBORAN_MID|MED_WEST": { depthM: 65, widthNM: 28 },
    "MED_WEST|MED_CENTRAL": { depthM: 80, widthNM: 32 },
    "MED_WEST|MED_SICILY": { depthM: 70, widthNM: 32 },
    "MED_CENTRAL|MED_SICILY": { depthM: 55, widthNM: 26 },
    "MED_SICILY|MED_MALTA": { depthM: 58, widthNM: 28 },
    "MED_MALTA|CRETE_S": { depthM: 90, widthNM: 32 },
    "MED_MALTA|MED_CRETE": { depthM: 90, widthNM: 32 },
    "MED_MALTA|MED_EAST": { depthM: 90, widthNM: 32 },
    "MED_SICILY|MED_EAST": { depthM: 80, widthNM: 32 },
    "MED_EAST|PORT_SAID_APP": { depthM: 32, widthNM: 25 },
    "MED_CRETE|PORT_SAID_APP": { depthM: 45, widthNM: 28 },
    "MED_EAST|CRETE_S": { depthM: 90, widthNM: 30 },
    "CRETE_S|PORT_SAID_APP": { depthM: 40, widthNM: 25 },
    // Suez Canal & Red Sea Spine
    "PORT_SAID_APP|SUEZ_CANAL_MID": { depthM: 24, widthNM: 18 },
    "SUEZ_CANAL_MID|SUEZ_SOUTH": { depthM: 24, widthNM: 18 },
    "SUEZ_SOUTH|RED_SEA_JUBAL": { depthM: 28, widthNM: 22 },
    "RED_SEA_JUBAL|RED_SEA_N": { depthM: 65, widthNM: 25 },
    "RED_SEA_N|RED_SEA_MID": { depthM: 85, widthNM: 28 },
    "RED_SEA_JUBAL|RED_SEA_MID": { depthM: 85, widthNM: 28 },
    "RED_SEA_MID|RED_SEA_S": { depthM: 65, widthNM: 28 },
    "RED_SEA_MID|RED_SEA_SOUTH": { depthM: 65, widthNM: 28 },
    "RED_SEA_S|BAB_EL_MANDEB": { depthM: 35, widthNM: 20 },
    "RED_SEA_SOUTH|BAB_EL_MANDEB": { depthM: 35, widthNM: 20 },
    "BAB_EL_MANDEB|GULF_OF_ADEN": { depthM: 45, widthNM: 24 },
    "GULF_OF_ADEN|SOCOTRA_N": { depthM: 85, widthNM: 30 },
    "SOCOTRA_N|ARABIAN_SEA_MID": { depthM: 120, widthNM: 35 },
    "SALALAH_APP|ARABIAN_SEA_MID": { depthM: 95, widthNM: 30 },
    "SALALAH_APP|SOCOTRA_N": { depthM: 85, widthNM: 28 },
    "SALALAH_APP|GULF_OF_ADEN": { depthM: 65, widthNM: 26 },
    // English Channel, Dover & German Bight Spine
    "ST_VINCENT|FINISTERRE": { depthM: 85, widthNM: 30 },
    "FINISTERRE|BISCAY_MID": { depthM: 110, widthNM: 35 },
    "FINISTERRE|USHANT": { depthM: 85, widthNM: 30 },
    "BISCAY_MID|USHANT": { depthM: 80, widthNM: 30 },
    "USHANT|CASQUETS": { depthM: 58, widthNM: 26 },
    "CASQUETS|ENGLISH_CH_MID": { depthM: 42, widthNM: 24 },
    "CASQUETS|ENGLISH_CHANNEL_MID": { depthM: 42, widthNM: 24 },
    "ENGLISH_CH_MID|DOVER_STRAIT": { depthM: 28, widthNM: 20 },
    "ENGLISH_CHANNEL_MID|DOVER_STRAIT": { depthM: 28, widthNM: 20 },
    "USHANT|ENGLISH_CH_W": { depthM: 58, widthNM: 25 },
    "ENGLISH_CH_W|ENGLISH_CH_E": { depthM: 38, widthNM: 22 },
    "ENGLISH_CH_E|DOVER_STRAIT": { depthM: 26, widthNM: 18 },
    "DOVER_STRAIT|ROTTERDAM_APP": { depthM: 24, widthNM: 22 },
    "DOVER_STRAIT|ANTWERP_APP": { depthM: 22, widthNM: 20 },
    "ROTTERDAM_APP|ANTWERP_APP": { depthM: 22, widthNM: 18 },
    "ROTTERDAM_APP|GERMAN_BIGHT_TSS": { depthM: 25, widthNM: 24 },
    "DOVER_STRAIT|GERMAN_BIGHT_TSS": { depthM: 25, widthNM: 24 },
    "GERMAN_BIGHT_TSS|BREMERHAVEN_APP": { depthM: 24, widthNM: 22 },
    "BREMERHAVEN_APP|HAMBURG_APP": { depthM: 22, widthNM: 22 },
    // Malacca, Singapore, Natuna, Karimata, Sunda, Java Sea & Lombok Spine
    "DONDRA_HEAD|SIX_DEGREE_CH": { depthM: 95, widthNM: 32 },
    "SIX_DEGREE_CH|MALACCA_N": { depthM: 52, widthNM: 26 },
    "MALACCA_N|MALACCA_MID": { depthM: 32, widthNM: 22 },
    "MALACCA_MID|MALACCA_S": { depthM: 25, widthNM: 18 },
    "MALACCA_S|SINGAPORE_W": { depthM: 23, widthNM: 16 },
    "SINGAPORE_W|SINGAPORE_MAIN": { depthM: 23, widthNM: 16 },
    "SINGAPORE_MAIN|SINGAPORE_E": { depthM: 24, widthNM: 16 },
    "SINGAPORE_E|NATUNA_CORRIDOR": { depthM: 38, widthNM: 24 },
    "NATUNA_CORRIDOR|SCS_SOUTH": { depthM: 52, widthNM: 28 },
    "NATUNA_CORRIDOR|SCS_MID": { depthM: 75, widthNM: 30 },
    "SINGAPORE_E|SCS_SOUTH": { depthM: 36, widthNM: 24 },
    "SCS_SOUTH|SCS_MID": { depthM: 85, widthNM: 32 },
    "NATUNA_CORRIDOR|KARIMATA_STRAIT": { depthM: 32, widthNM: 24 },
    "KARIMATA_STRAIT|GASPAR_STRAIT": { depthM: 26, widthNM: 22 },
    "GASPAR_STRAIT|SUNDA_STRAIT": { depthM: 32, widthNM: 22 },
    "SUNDA_STRAIT|JAVA_SEA_W": { depthM: 30, widthNM: 22 },
    "GASPAR_STRAIT|JAVA_SEA_W": { depthM: 28, widthNM: 22 },
    "JAVA_SEA_W|JAVA_SEA_E": { depthM: 42, widthNM: 25 },
    "JAVA_SEA_E|LOMBOK_STRAIT": { depthM: 65, widthNM: 24 },
    "LOMBOK_STRAIT|MAKASSAR_S": { depthM: 75, widthNM: 24 },
    // Far East, Okinawa, Luzon, Osumi, Nojimazaki & North Pacific Spine
    "SCS_MID|SCS_NORTH": { depthM: 85, widthNM: 32 },
    "SCS_NORTH|TAIWAN_STRAIT": { depthM: 58, widthNM: 28 },
    "SCS_MID|TAIWAN_STRAIT": { depthM: 55, widthNM: 28 },
    "SCS_MID|LUZON_STRAIT": { depthM: 95, widthNM: 32 },
    "SCS_NORTH|LUZON_STRAIT": { depthM: 95, widthNM: 32 },
    "LUZON_STRAIT|OKINAWA_SE": { depthM: 200, widthNM: 35 },
    "OKINAWA_SE|SHIONOMISAKI_OFF": { depthM: 200, widthNM: 35 },
    "LUZON_STRAIT|EAST_CHINA_SEA": { depthM: 95, widthNM: 30 },
    "SCS_MID|HONG_KONG_APP": { depthM: 38, widthNM: 24 },
    "SCS_NORTH|HONG_KONG_APP": { depthM: 38, widthNM: 24 },
    "HONG_KONG_APP|TAIWAN_STRAIT": { depthM: 45, widthNM: 25 },
    "TAIWAN_STRAIT|EAST_CHINA_SEA": { depthM: 58, widthNM: 28 },
    "TAIWAN_STRAIT|SHANGHAI_APP": { depthM: 30, widthNM: 24 },
    "SHANGHAI_APP|EAST_CHINA_SEA": { depthM: 36, widthNM: 25 },
    "SHANGHAI_APP|NINGBO_APP": { depthM: 24, widthNM: 20 },
    "NINGBO_APP|TAIWAN_STRAIT": { depthM: 42, widthNM: 24 },
    "NINGBO_APP|EAST_CHINA_SEA": { depthM: 45, widthNM: 24 },
    "EAST_CHINA_SEA|OSUMI_STRAIT": { depthM: 75, widthNM: 26 },
    "EAST_CHINA_SEA|KOREA_STRAIT": { depthM: 65, widthNM: 26 },
    "OSUMI_STRAIT|SHIONOMISAKI_OFF": { depthM: 120, widthNM: 32 },
    "SHIONOMISAKI_OFF|IZU_OSHIMA_S": { depthM: 120, widthNM: 32 },
    "IZU_OSHIMA_S|NOJIMAZAKI_OFF": { depthM: 120, widthNM: 32 },
    "NOJIMAZAKI_OFF|NPAC_GC_WEST": { depthM: 200, widthNM: 40 },
    "OSUMI_STRAIT|TOKYO_APP": { depthM: 85, widthNM: 28 },
    "OSUMI_STRAIT|NPAC_GC_WEST": { depthM: 120, widthNM: 35 },
    "TOKYO_APP|NOJIMAZAKI_OFF": { depthM: 60, widthNM: 26 },
    "TOKYO_APP|NPAC_GC_WEST": { depthM: 120, widthNM: 35 },
    "NPAC_GC_WEST|NPAC_GC_MID": { depthM: 200, widthNM: 40 },
    "NPAC_GC_MID|NPAC_GC_EAST": { depthM: 200, widthNM: 40 },
    "NPAC_GC_WEST|NPAC_GC_EAST": { depthM: 200, widthNM: 40 },
    "NPAC_GC_EAST|SAN_FRANCISCO_APP": { depthM: 45, widthNM: 28 },
    "NPAC_GC_MID|SAN_FRANCISCO_APP": { depthM: 65, widthNM: 30 },
    "SAN_FRANCISCO_APP|LONG_BEACH_APP": { depthM: 55, widthNM: 26 },
    // Hormuz, Gulf of Oman & Persian Gulf Spine
    "JEBEL_ALI_APP|HORMUZ_STRAIT": { depthM: 25, widthNM: 22 },
    "MUSCAT_APP|HORMUZ_STRAIT": { depthM: 48, widthNM: 22 },
    "HORMUZ_STRAIT|ARABIAN_GULF_MID": { depthM: 36, widthNM: 22 },
    "HORMUZ_STRAIT|PERSIAN_GULF_MID": { depthM: 36, widthNM: 22 },
    "HORMUZ_STRAIT|GULF_OF_OMAN": { depthM: 55, widthNM: 25 },
    "GULF_OF_OMAN|RAS_AL_HADD_OFF": { depthM: 90, widthNM: 30 },
    "RAS_AL_HADD_OFF|ARABIAN_SEA_MID": { depthM: 150, widthNM: 35 },
    // West Africa, Cape Town & South Atlantic Spine
    "CAPE_TOWN_APP|CAPE_POINT_W": { depthM: 45, widthNM: 24 },
    "CAPE_TOWN_APP|WALVIS_OFF": { depthM: 120, widthNM: 32 },
    "CAPE_POINT_W|CAPE_AGULHAS": { depthM: 65, widthNM: 26 },
    "CAPE_AGULHAS|PORT_ELIZABETH_OFF": { depthM: 75, widthNM: 28 },
    "CAPE_POINT_W|WALVIS_OFF": { depthM: 150, widthNM: 35 },
    "WALVIS_OFF|SOUTH_ATLANTIC_MID": { depthM: 200, widthNM: 38 },
    "SOUTH_ATLANTIC_MID|ST_HELENA_E": { depthM: 200, widthNM: 40 },
    "ST_HELENA_E|CAPE_VERDE_PASS": { depthM: 200, widthNM: 40 },
    "CAPE_VERDE_PASS|CANARY_PASS": { depthM: 200, widthNM: 35 },
    "CANARY_PASS|ST_VINCENT": { depthM: 200, widthNM: 35 },
    // North America Atlantic & Florida Straits Spine
    "SAVANNAH_APP|CAPE_CANAVERAL_OFF": { depthM: 32, widthNM: 25 },
    "CAPE_CANAVERAL_OFF|GREAT_ISAAC_N": { depthM: 45, widthNM: 24 },
    "GREAT_ISAAC_N|FLORIDA_STRAIT": { depthM: 45, widthNM: 22 },
    "FLORIDA_STRAIT|KEY_WEST_S": { depthM: 45, widthNM: 22 },
    "KEY_WEST_S|GULF_MEXICO_MID": { depthM: 120, widthNM: 35 },
    "GULF_MEXICO_MID|HOUSTON_APP": { depthM: 22, widthNM: 24 },
    // Panama Canal Spine
    "PACIFIC_PANAMA_APP|PANAMA_BALBOA": { depthM: 22, widthNM: 18 },
    "PANAMA_BALBOA|PANAMA_COLON": { depthM: 18, widthNM: 18 },
    "PANAMA_COLON|CARIBBEAN_MID": { depthM: 45, widthNM: 24 },
    // Australia & Indonesia Deepwater & Torres Spine
    "SYDNEY_APP|GABO_ISLAND": { depthM: 65, widthNM: 26 },
    "GABO_ISLAND|BASS_STRAIT_W": { depthM: 52, widthNM: 26 },
    "BASS_STRAIT_W|MELBOURNE_APP": { depthM: 38, widthNM: 22 },
    "BASS_STRAIT_W|KANGAROO_IS_S": { depthM: 65, widthNM: 28 },
    "KANGAROO_IS_S|CAPE_LEEUWIN": { depthM: 90, widthNM: 32 },
    "CAPE_LEEUWIN|FREMANTLE_APP": { depthM: 55, widthNM: 26 },
    "FREMANTLE_APP|NORTH_WEST_CAPE": { depthM: 80, widthNM: 28 },
    "NORTH_WEST_CAPE|HEDLAND_APP": { depthM: 35, widthNM: 24 },
    "NORTH_WEST_CAPE|LOMBOK_STRAIT": { depthM: 120, widthNM: 32 },
    "NORTH_WEST_CAPE|SUNDA_STRAIT": { depthM: 120, widthNM: 32 },
    "SYDNEY_APP|CORAL_SEA_S": { depthM: 85, widthNM: 28 },
    "CORAL_SEA_S|BRISBANE_APP": { depthM: 35, widthNM: 24 },
    "CORAL_SEA_S|CORAL_SEA_N": { depthM: 150, widthNM: 32 },
    "CORAL_SEA_N|TORRES_STRAIT": { depthM: 12.5, widthNM: 18 },
    "TORRES_STRAIT|ARAFURA_SEA": { depthM: 12.5, widthNM: 22 },
    "ARAFURA_SEA|WETAR_STRAIT": { depthM: 90, widthNM: 28 },
    "WETAR_STRAIT|LOMBOK_STRAIT": { depthM: 95, widthNM: 26 },
    "ARAFURA_SEA|LOMBOK_STRAIT": { depthM: 95, widthNM: 28 }
  };

  function edgeKeyPair(u, v) {
    return u < v ? (u + "|" + v) : (v + "|" + u);
  }

  function getCuratedFairwayRule(u, v) {
    if (!u || !v) return null;
    return CURATED_FAIRWAY_EDGES[u + "|" + v] || CURATED_FAIRWAY_EDGES[v + "|" + u] || null;
  }

  function calculateInitialBearingDeg(lat1, lon1, lat2, lon2) {
    if (typeof window.calculateBearing === "function") {
      return window.calculateBearing(lat1, lon1, lat2, lon2);
    }
    var toRad = Math.PI / 180;
    var phi1 = lat1 * toRad;
    var phi2 = lat2 * toRad;
    var dLon = (lon2 - lon1) * toRad;
    var y = Math.sin(dLon) * Math.cos(phi2);
    var x = Math.cos(phi1) * Math.sin(phi2) - Math.sin(phi1) * Math.cos(phi2) * Math.cos(dLon);
    var brg = Math.atan2(y, x) * (180 / Math.PI);
    return (brg + 360) % 360;
  }

  function setrouteTurnAngleDeg(b1, b2) {
    var d = Math.abs(((b2 - b1) % 360 + 540) % 360 - 180);
    return d;
  }

  // Precomputed fairway segment list for fast point/leg queries
  var FAIRWAY_SEGMENTS = [];

  // Explicit port estuary approach channels so terminal pilot-station legs are recognized as navigable fairways
  var PORT_ESTUARY_FAIRWAYS = [
    { lat1: 54.00, lon1: 8.10,   lat2: 53.75, lon2: 8.20,   depthM: 21, widthNM: 22 }, // Elbe / Cuxhaven / Brunsbuettel
    { lat1: 53.75, lon1: 8.20,   lat2: 53.55, lon2: 9.97,   depthM: 17, widthNM: 18 }, // Lower Elbe -> Hamburg Waltershof
    { lat1: 31.15, lon1: 122.25, lat2: 31.00, lon2: 122.50, depthM: 22, widthNM: 24 }, // Shanghai Changjiang Kou / Yangshan
    { lat1: 51.95, lon1: 4.14,   lat2: 52.10, lon2: 3.70,   depthM: 24, widthNM: 20 }, // Rotterdam Maasgeul
    { lat1: 37.75, lon1: -122.65,lat2: 37.80, lon2: -122.40,depthM: 18, widthNM: 18 }, // San Francisco / Oakland Bar Channel
    { lat1: 16.88, lon1: 54.05,  lat2: 16.93, lon2: 54.00,  depthM: 20, widthNM: 18 }, // Salalah Approach
    { lat1: -33.82,lon1: 151.30, lat2: -33.85,lon2: 151.35, depthM: 22, widthNM: 18 }, // Sydney Heads Approach
    { lat1: -33.85,lon1: 18.32,  lat2: -34.40,lon2: 18.00,  depthM: 25, widthNM: 20 }, // Cape Town Table Bay Offshore
    { lat1: 25.00, lon1: 54.95,  lat2: 26.35, lon2: 56.50,  depthM: 22, widthNM: 24 }, // Jebel Ali / Dubai -> Hormuz
    { lat1: 35.40, lon1: 139.70, lat2: 34.80, lon2: 139.80, depthM: 22, widthNM: 18 }  // Yokohama / Uraga Suido Fairway
  ];

  function rebuildFairwaySegments() {
    FAIRWAY_SEGMENTS = [];
    if (typeof MARITIME_SEA_NODES !== "object" || !MARITIME_SEA_NODES) return;
    var keys = Object.keys(CURATED_FAIRWAY_EDGES);
    for (var i = 0; i < keys.length; i++) {
      var k = keys[i];
      var parts = k.split("|");
      var a = MARITIME_SEA_NODES[parts[0]];
      var b = MARITIME_SEA_NODES[parts[1]];
      if (!a || !b) continue;
      var rule = CURATED_FAIRWAY_EDGES[k];
      FAIRWAY_SEGMENTS.push({
        u: parts[0],
        v: parts[1],
        lat1: a[0],
        lon1: a[1],
        lat2: b[0],
        lon2: b[1],
        minLat: Math.min(a[0], b[0]) - 0.8,
        maxLat: Math.max(a[0], b[0]) + 0.8,
        minLon: Math.min(a[1], b[1]) - 1.0,
        maxLon: Math.max(a[1], b[1]) + 1.0,
        depthM: rule.depthM || 25,
        widthNM: rule.widthNM || 20
      });
    }
    for (var pi = 0; pi < PORT_ESTUARY_FAIRWAYS.length; pi++) {
      var pf = PORT_ESTUARY_FAIRWAYS[pi];
      FAIRWAY_SEGMENTS.push({
        u: "PORT_ESTUARY_" + pi,
        v: "PORT_APP_" + pi,
        lat1: pf.lat1,
        lon1: pf.lon1,
        lat2: pf.lat2,
        lon2: pf.lon2,
        minLat: Math.min(pf.lat1, pf.lat2) - 0.65,
        maxLat: Math.max(pf.lat1, pf.lat2) + 0.65,
        minLon: Math.min(pf.lon1, pf.lon2) - 0.85,
        maxLon: Math.max(pf.lon1, pf.lon2) + 0.85,
        depthM: pf.depthM,
        widthNM: pf.widthNM
      });
    }
  }

  // Calibrate post-advisory cyclone decay relative to the storm's actual last advisory tau
  var _origStormStateAtTau = typeof window.setrouteStormStateAtTau === "function"
    ? window.setrouteStormStateAtTau
    : null;

  if (_origStormStateAtTau) {
    window.setrouteStormStateAtTau = function (st, tauHours) {
      if (!st) return null;
      var tau = Math.max(0, Number(tauHours) || 0);
      var lastTau = 0;
      var track = st.forecastTrack;
      if (Array.isArray(track)) {
        for (var i = 0; i < track.length; i++) {
          var t = Number(track[i] && track[i].tau) || 0;
          if (t > lastTau) lastTau = t;
        }
      }
      var maxValidTau = Math.min(192, lastTau + 72);
      if (tau > maxValidTau) return null;
      var s = _origStormStateAtTau(st, tau);
      if (!s) return null;
      if (tau > lastTau + 24) {
        var overH = tau - (lastTau + 24);
        var decay = Math.max(0, 1 - overH / 48);
        var decayedWinds = (s.winds || 0) * decay;
        if (decayedWinds < 28) return null;
        return {
          lat: s.lat,
          lon: s.lon,
          winds: decayedWinds,
          radiusNm: (s.radiusNm || 90) * (0.75 + 0.25 * decay),
          tau: tau,
          name: s.name,
          _fade: Math.round(decay * 1000) / 1000
        };
      }
      return s;
    };
  }

  // Cross-track / point-to-segment distance in NM (handles antimeridian wrap cleanly)
  function pointToSegmentDistNM(pLat, pLon, lat1, lon1, lat2, lon2) {
    var meanLatRad = ((lat1 + lat2 + pLat) / 3) * (Math.PI / 180);
    var cosLat = Math.max(0.15, Math.cos(meanLatRad));
    var dLon12 = ((lon2 - lon1 + 540) % 360) - 180;
    var dLon1p = ((pLon - lon1 + 540) % 360) - 180;
    var dx = dLon12 * 60 * cosLat;
    var dy = (lat2 - lat1) * 60;
    var px = dLon1p * 60 * cosLat;
    var py = (pLat - lat1) * 60;
    var lenSq = dx * dx + dy * dy;
    var t = 0;
    if (lenSq > 1e-6) {
      t = (px * dx + py * dy) / lenSq;
      if (t < 0) t = 0;
      else if (t > 1) t = 1;
    }
    var ex = px - t * dx;
    var ey = py - t * dy;
    return Math.sqrt(ex * ex + ey * ey);
  }

  function getPointFairwayDepthM(lat, lon) {
    var bestDepth = 0;
    for (var i = 0; i < FAIRWAY_SEGMENTS.length; i++) {
      var s = FAIRWAY_SEGMENTS[i];
      if (lat < s.minLat || lat > s.maxLat) continue;
      var wrapsAntimeridian = Math.abs(s.lon2 - s.lon1) > 180;
      if (!wrapsAntimeridian && (lon < s.minLon || lon > s.maxLon)) continue;
      var d = pointToSegmentDistNM(lat, lon, s.lat1, s.lon1, s.lat2, s.lon2);
      if (d <= s.widthNM && s.depthM > bestDepth) {
        bestDepth = s.depthM;
      }
    }
    return bestDepth;
  }

  function isLegInsideCuratedFairway(lat1, lon1, lat2, lon2) {
    var d = typeof calculateHaversineDistanceNM === "function"
      ? calculateHaversineDistanceNM(lat1, lon1, lat2, lon2)
      : 0;
    if (d > 2200) return false;
    var samples = d > 400
      ? [0.0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1.0]
      : [0.0, 0.25, 0.5, 0.75, 1.0];
    var dLon = ((lon2 - lon1 + 540) % 360) - 180;
    for (var i = 0; i < samples.length; i++) {
      var t = samples[i];
      var pLat = lat1 + (lat2 - lat1) * t;
      var pLon = (((lon1 + dLon * t) + 540) % 360) - 180;
      if (getPointFairwayDepthM(pLat, pLon) <= 0) return false;
    }
    return true;
  }

  function applyGraphNodeAndBoxFixes() {
    if (typeof MARITIME_SEA_NODES === "object" && MARITIME_SEA_NODES) {
      var nKeys = Object.keys(EXTRA_SEA_NODES);
      for (var i = 0; i < nKeys.length; i++) {
        var k = nKeys[i];
        MARITIME_SEA_NODES[k] = EXTRA_SEA_NODES[k];
      }
    }

    if (Array.isArray(MARITIME_SEA_EDGES)) {
      for (var ri = MARITIME_SEA_EDGES.length - 1; ri >= 0; ri--) {
        var re = MARITIME_SEA_EDGES[ri];
        if (!re || re.length < 2 || BAD_LAND_CUT_EDGES[edgeKeyPair(re[0], re[1])]) {
          MARITIME_SEA_EDGES.splice(ri, 1);
        }
      }
      var existing = {};
      for (var ei = 0; ei < MARITIME_SEA_EDGES.length; ei++) {
        var e = MARITIME_SEA_EDGES[ei];
        if (e && e.length >= 2) existing[edgeKeyPair(e[0], e[1])] = true;
      }
      for (var j = 0; j < EXTRA_SEA_EDGES.length; j++) {
        var ne = EXTRA_SEA_EDGES[j];
        var ek = edgeKeyPair(ne[0], ne[1]);
        if (!existing[ek]) {
          MARITIME_SEA_EDGES.push(ne);
          existing[ek] = true;
        }
      }
    }

    // Fix Iberia W interior land box that overlapped Gulf of Cadiz (GIBRALTAR_W -> ST_VINCENT)
    if (Array.isArray(SETROUTE_LAND_BOXES)) {
      for (var bi = 0; bi < SETROUTE_LAND_BOXES.length; bi++) {
        var b = SETROUTE_LAND_BOXES[bi];
        if (!b) continue;
        if (b.minLat === 36.0 && b.maxLat === 40.0 && b.minLon === -9.0 && b.maxLon === -6.0) {
          b.minLat = 37.30;
          b.minLon = -8.45;
        }
      }
    }

    rebuildFairwaySegments();

    // Sanitize pre-v5.244 poisoned edgeWeights (false-positive blocks on straits/canals or removed land-cuts) and bad OD cache
    if (typeof SetRouteBrainMemory === "object" && SetRouteBrainMemory && typeof SetRouteBrainMemory.load === "function") {
      try {
        var mem = SetRouteBrainMemory.load();
        if (mem) {
          var memChanged = false;
          if (mem.edgeWeights && typeof mem.edgeWeights === "object") {
            var pKeys = Object.keys(mem.edgeWeights);
            for (var pk = 0; pk < pKeys.length; pk++) {
              var pair = pKeys[pk].split("<->");
              if (pair.length === 2 && (getCuratedFairwayRule(pair[0], pair[1]) || BAD_LAND_CUT_EDGES[edgeKeyPair(pair[0], pair[1])])) {
                delete mem.edgeWeights[pKeys[pk]];
                memChanged = true;
              }
            }
          }
          if (mem.calVer !== "v5.244") {
            mem.calVer = "v5.244";
            if (mem.odExperiences && typeof mem.odExperiences === "object") {
              var odKeys = Object.keys(mem.odExperiences);
              for (var ok = 0; ok < odKeys.length; ok++) {
                var exp = mem.odExperiences[odKeys[ok]];
                if (!exp) continue;
                var np = exp.bestNodePath || [];
                var hasBad = false;
                var seenN = {};
                for (var ni2 = 0; ni2 < np.length; ni2++) {
                  if (seenN[np[ni2]]) { hasBad = true; break; }
                  seenN[np[ni2]] = true;
                  if (ni2 > 0 && BAD_LAND_CUT_EDGES[edgeKeyPair(np[ni2 - 1], np[ni2])]) {
                    hasBad = true;
                    break;
                  }
                }
                if (hasBad || (exp.failedModes && exp.failedModes.length > 0) || exp.via === "cape") {
                  delete mem.odExperiences[odKeys[ok]];
                }
              }
            }
            memChanged = true;
          }
          if (memChanged && typeof SetRouteBrainMemory.save === "function") {
            SetRouteBrainMemory.save();
          }
        }
      } catch (eMem) {}
    }
  }

  // ---------------------------------------------------------------------------
  // 2. CALIBRATE DEPTH, LAND-BOX & LAND-CROSSING DETECTORS AROUND FAIRWAYS
  // ---------------------------------------------------------------------------
  var _origPointInLandBox = typeof window.setroutePointInLandBox === "function" ? window.setroutePointInLandBox : null;
  var _origEstimateDepthM = typeof window.setrouteEstimateDepthM === "function" ? window.setrouteEstimateDepthM : null;
  var _origLegLikelyCrossesLand = typeof window.setrouteLegLikelyCrossesLand === "function" ? window.setrouteLegLikelyCrossesLand : null;
  var _origEdgeHazardPenalty = typeof window.setrouteEdgeHazardPenalty === "function" ? window.setrouteEdgeHazardPenalty : null;
  var _origLegTooShallow = typeof window.setrouteLegTooShallow === "function" ? window.setrouteLegTooShallow : null;

  window.setroutePointInLandBox = function (lat, lon) {
    if (getPointFairwayDepthM(lat, lon) > 0) return false;
    return _origPointInLandBox ? _origPointInLandBox(lat, lon) : false;
  };

  window.setrouteEstimateDepthM = function (lat, lon) {
    var fwDepth = getPointFairwayDepthM(lat, lon);
    var baseDepth = _origEstimateDepthM ? _origEstimateDepthM(lat, lon) : 80;
    if (fwDepth > 0) {
      return Math.max(fwDepth, baseDepth);
    }
    return baseDepth;
  };

  window.setrouteLegTooShallow = function (lat1, lon1, lat2, lon2, minDepthM) {
    var need = Number(minDepthM) > 0
      ? Number(minDepthM)
      : (typeof setrouteGetMinRequiredDepthM === "function" ? setrouteGetMinRequiredDepthM() : 0);
    if (!need || need <= 0) return false;
    if (isLegInsideCuratedFairway(lat1, lon1, lat2, lon2)) {
      var midFw = getPointFairwayDepthM((lat1 + lat2) * 0.5, (lon1 + lon2) * 0.5);
      if (midFw + 0.05 >= need) return false;
    }
    return _origLegTooShallow ? _origLegTooShallow(lat1, lon1, lat2, lon2, need) : false;
  };

  window.setrouteLegLikelyCrossesLand = function (lat1, lon1, lat2, lon2) {
    if (isLegInsideCuratedFairway(lat1, lon1, lat2, lon2)) return false;
    return _origLegLikelyCrossesLand ? _origLegLikelyCrossesLand(lat1, lon1, lat2, lon2) : false;
  };

  window.setrouteEdgeHazardPenalty = function (lat1, lon1, lat2, lon2) {
    if (isLegInsideCuratedFairway(lat1, lon1, lat2, lon2)) return 0;
    return _origEdgeHazardPenalty ? _origEdgeHazardPenalty(lat1, lon1, lat2, lon2) : 0;
  };

  // ---------------------------------------------------------------------------
  // 3. CALIBRATE setrouteBuildAdjacency — PROTECT CURATED FAIRWAYS & CHANNELS
  // ---------------------------------------------------------------------------
  var _calAdjCache = null;
  var _calAdjCacheKey = "";

  window.setrouteBuildAdjacency = function (force) {
    applyGraphNodeAndBoxFixes();
    var minDepthKey = (typeof setrouteGetMinRequiredDepthM === "function" ? setrouteGetMinRequiredDepthM() : 0) || 0;
    var cacheKey = [
      (typeof SETROUTE_LAND_MASK !== "undefined" && SETROUTE_LAND_MASK) ? "mask1" : "mask0",
      (typeof SETROUTE_COAST_GRID !== "undefined" && SETROUTE_COAST_GRID) ? "coast1" : "coast0",
      (typeof SETROUTE_TSS_SCHEMES !== "undefined" && SETROUTE_TSS_SCHEMES) ? SETROUTE_TSS_SCHEMES.length : 0,
      Object.keys(MARITIME_SEA_NODES).length,
      MARITIME_SEA_EDGES.length,
      "d" + minDepthKey
    ].join("|");

    if (!force && _calAdjCache && _calAdjCacheKey === cacheKey) {
      return _calAdjCache;
    }

    try {
      if (typeof _setrouteSeaGateKeys !== "undefined") _setrouteSeaGateKeys = null;
      if (typeof _setrouteWetPathMemo !== "undefined" && _setrouteWetPathMemo) _setrouteWetPathMemo.clear();
    } catch (eCache) {}

    var adj = {};
    var nodeKeys = Object.keys(MARITIME_SEA_NODES);
    for (var ni = 0; ni < nodeKeys.length; ni++) {
      adj[nodeKeys[ni]] = [];
    }

    for (var i = 0; i < MARITIME_SEA_EDGES.length; i++) {
      var pair = MARITIME_SEA_EDGES[i];
      var u = pair[0];
      var v = pair[1];
      var a = MARITIME_SEA_NODES[u];
      var b = MARITIME_SEA_NODES[v];
      if (!a || !b) continue;

      var dist = calculateHaversineDistanceNM(a[0], a[1], b[0], b[1]);
      var via = null;
      var hazard = 0;
      var fwRule = getCuratedFairwayRule(u, v);

      if (fwRule) {
        // Curated international strait / canal / TSS spine:
        // Only block if vessel required depth genuinely exceeds the canal/strait charted depth
        if (minDepthKey > 0 && minDepthKey > (fwRule.depthM + 0.05)) {
          hazard += 65000;
        } else {
          if (typeof setrouteStaticNonStormWeatherPenalty === "function") {
            hazard += setrouteStaticNonStormWeatherPenalty(a[0], a[1], b[0], b[1]) * 0.6;
          }
        }
      } else {
        var samples = dist > 800 ? [0.2, 0.4, 0.6, 0.8] : (dist > 200 ? [0.25, 0.5, 0.75] : [0.5]);
        var boxHits = 0;
        for (var si = 0; si < samples.length; si++) {
          var p = setrouteLerpLatLon(a[0], a[1], b[0], b[1], samples[si]);
          if (window.setroutePointInLandBox(p[0], p[1])) boxHits++;
        }
        var coastHit = dist >= 90 && typeof setrouteLegCrossesCoastline === "function" &&
          setrouteLegCrossesCoastline(a[0], a[1], b[0], b[1]);

        var tssBan = typeof setrouteTssHardBan === "function" && setrouteTssHardBan(a[0], a[1], b[0], b[1]);
        var ialaBan = typeof setrouteIalaHardBan === "function" && setrouteIalaHardBan(a[0], a[1], b[0], b[1]);
        if (tssBan || ialaBan) {
          var wetTss = typeof setrouteWetPathLattice === "function"
            ? setrouteWetPathLattice(a[0], a[1], b[0], b[1])
            : null;
          if (wetTss && Array.isArray(wetTss.via) && wetTss.via.length > 0 && wetTss.via.length <= 8 && wetTss.distNm < dist * 1.45) {
            via = wetTss.via;
            dist = wetTss.distNm;
            hazard += 1800;
          } else {
            hazard += 45000;
          }
        }

        var depthBlocked = minDepthKey > 0 && window.setrouteLegTooShallow(a[0], a[1], b[0], b[1], minDepthKey);
        if (depthBlocked && !via) {
          var wetDeep = typeof setrouteWetPathLattice === "function"
            ? setrouteWetPathLattice(a[0], a[1], b[0], b[1])
            : null;
          var deepOk = false;
          if (wetDeep && Array.isArray(wetDeep.via) && wetDeep.via.length > 0 && wetDeep.via.length <= 8 && wetDeep.distNm < dist * 1.45) {
            deepOk = true;
            var prevPt = [a[0], a[1]];
            var chain = wetDeep.via.concat([[b[0], b[1]]]);
            for (var wi = 0; wi < chain.length; wi++) {
              if (window.setrouteLegTooShallow(prevPt[0], prevPt[1], chain[wi][0], chain[wi][1], minDepthKey)) {
                deepOk = false;
                break;
              }
              prevPt = chain[wi];
            }
          }
          if (deepOk) {
            via = wetDeep.via;
            dist = wetDeep.distNm;
            hazard += 1200;
            depthBlocked = false;
          } else {
            hazard += 65000;
          }
        }

        var interiorChord = boxHits >= 2 && dist >= 350;
        var landCut = coastHit && dist >= 140;
        if (!via && (interiorChord || landCut || (boxHits >= 1 && dist >= 160) || (coastHit && dist >= 100))) {
          var wet = typeof setrouteWetPathLattice === "function"
            ? setrouteWetPathLattice(a[0], a[1], b[0], b[1])
            : null;
          if (wet && Array.isArray(wet.via) && wet.via.length > 0 && wet.via.length <= 8 && wet.distNm < dist * 1.45) {
            via = wet.via;
            dist = wet.distNm;
            hazard += 600;
          } else {
            hazard += 50000;
          }
        } else if (!via) {
          if (typeof setrouteStaticNonStormWeatherPenalty === "function") {
            hazard += setrouteStaticNonStormWeatherPenalty(a[0], a[1], b[0], b[1]);
          }
          if (typeof setrouteAisPenalty === "function") hazard += setrouteAisPenalty(a[0], a[1], b[0], b[1]) * 0.5;
          if (typeof setrouteLegShoalPenalty === "function") hazard += setrouteLegShoalPenalty(a[0], a[1], b[0], b[1]) * 0.85;
          if (typeof setrouteTssEdgePenalty === "function") hazard += setrouteTssEdgePenalty(a[0], a[1], b[0], b[1]);
          if (typeof setrouteIalaEdgePenalty === "function") hazard += setrouteIalaEdgePenalty(a[0], a[1], b[0], b[1]);
        }
      }

      var learnedPen = (!fwRule && typeof SetRouteBrainMemory !== "undefined" && SetRouteBrainMemory.getEdgePenalty)
        ? SetRouteBrainMemory.getEdgePenalty(u, v)
        : 0;
      var cost = dist + hazard + learnedPen;

      var eUv = { node: v, dist: dist, cost: cost };
      var eVu = { node: u, dist: dist, cost: cost };
      if (via && via.length) {
        eUv.via = via;
        eVu.via = via.slice().reverse();
      }
      adj[u].push(eUv);
      adj[v].push(eVu);
    }

    _calAdjCache = adj;
    _calAdjCacheKey = cacheKey;
    try {
      if (typeof _setrouteAdjCache !== "undefined") _setrouteAdjCache = adj;
      if (typeof _setrouteAdjCacheKey !== "undefined") _setrouteAdjCacheKey = cacheKey;
    } catch (eSet) {}
    return adj;
  };

  // ---------------------------------------------------------------------------
  // 4. CYCLE PRUNING & ANTI-BOOMERANG / ANTI-SPUR VIA-NODE ROUTING
  // ---------------------------------------------------------------------------
  function pruneNodePathCycles(nodePath) {
    if (!Array.isArray(nodePath) || nodePath.length < 3) return nodePath;
    var out = [];
    var posMap = {};
    for (var i = 0; i < nodePath.length; i++) {
      var k = nodePath[i];
      if (posMap[k] !== undefined) {
        var cutIdx = posMap[k];
        while (out.length > cutIdx + 1) {
          var removed = out.pop();
          delete posMap[removed];
        }
      } else {
        posMap[k] = out.length;
        out.push(k);
      }
    }
    // Second pass: collapse near-duplicate spatial loops (two non-adjacent nodes within 30 NM)
    var cleaned = out.slice();
    var changed = true;
    var guard = 0;
    while (changed && guard++ < 15) {
      changed = false;
      for (var a = 0; a < cleaned.length - 2; a++) {
        var na = MARITIME_SEA_NODES[cleaned[a]];
        if (!na) continue;
        for (var b = cleaned.length - 1; b >= a + 2; b--) {
          var nb = MARITIME_SEA_NODES[cleaned[b]];
          if (!nb) continue;
          var d = calculateHaversineDistanceNM(na[0], na[1], nb[0], nb[1]);
          if (d < 32) {
            cleaned.splice(a + 1, b - a);
            changed = true;
            break;
          }
        }
        if (changed) break;
      }
    }
    return cleaned;
  }
  window.setroutePrunePathCycles = pruneNodePathCycles;

  function buildAdjacencyExcludingNodes(adj, excludedMap) {
    var filtered = {};
    var keys = Object.keys(adj);
    for (var i = 0; i < keys.length; i++) {
      var u = keys[i];
      if (excludedMap[u]) {
        filtered[u] = [];
        continue;
      }
      var list = adj[u] || [];
      var out = [];
      for (var j = 0; j < list.length; j++) {
        var edge = list[j];
        if (!excludedMap[edge.node]) {
          out.push(edge);
        }
      }
      filtered[u] = out;
    }
    return filtered;
  }

  function hasHairpinTurnAtVia(path) {
    if (!Array.isArray(path) || path.length < 3) return false;
    for (var i = 1; i < path.length - 1; i++) {
      var p0 = MARITIME_SEA_NODES[path[i - 1]];
      var p1 = MARITIME_SEA_NODES[path[i]];
      var p2 = MARITIME_SEA_NODES[path[i + 1]];
      if (!p0 || !p1 || !p2) continue;
      if (typeof calculateInitialBearingDeg === "function" && typeof setrouteTurnAngleDeg === "function") {
        var b1 = calculateInitialBearingDeg(p0[0], p0[1], p1[0], p1[1]);
        var b2 = calculateInitialBearingDeg(p1[0], p1[1], p2[0], p2[1]);
        var turn = setrouteTurnAngleDeg(b1, b2);
        if (turn > 142) return true;
      }
    }
    return false;
  }

  window.setroutePathViaNodeAsync = async function (startNode, endNode, viaNode, adj, opts) {
    if (!viaNode || !MARITIME_SEA_NODES[viaNode]) return null;
    if (viaNode === startNode || viaNode === endNode) {
      var dijkDirect = (opts && opts._asyncPlanning) ? setrouteDijkstraAsync : setrouteDijkstra;
      return Promise.resolve(dijkDirect(startNode, endNode, adj, opts || {}));
    }
    opts = opts || {};
    var dijk = opts._asyncPlanning ? setrouteDijkstraAsync : setrouteDijkstra;
    var p1 = await Promise.resolve(dijk(startNode, viaNode, adj, opts));
    if (!p1 || p1.length < 2) return null;

    var midMeta = (typeof setrouteDijkstraResultMeta === "function" && setrouteDijkstraResultMeta()) || {};
    // Forbid backtracking through p1's interior nodes so viaNode cannot become a dead-end out-and-back spur
    var excluded = {};
    for (var i = 0; i < p1.length - 1; i++) {
      excluded[p1[i]] = true;
    }
    if (excluded[endNode]) {
      return pruneNodePathCycles(p1);
    }
    var adj2 = buildAdjacencyExcludingNodes(adj, excluded);
    var p2 = await Promise.resolve(dijk(viaNode, endNode, adj2, Object.assign({}, opts, {
      t0Hours: midMeta.arrivalH != null ? midMeta.arrivalH : (Number(opts.t0Hours) || 0)
    })));
    if (!p2 || p2.length < 2) return null;

    var rawPath = p1.concat(p2.slice(1));
    if (hasHairpinTurnAtVia(rawPath)) return null;
    var path = pruneNodePathCycles(rawPath);
    var score = setroutePathTimedScore(path, opts.speedKnots, opts.stormWeight, opts.t0Hours);
    setrouteDijkstra._lastMeta = {
      cost: score.cost,
      arrivalH: score.arrivalH,
      stormPenalty: score.stormPen,
      timed: true
    };
    return path;
  };

  window.setroutePathViaNode = function (startNode, endNode, viaNode, adj, opts) {
    if (!viaNode || !MARITIME_SEA_NODES[viaNode]) return null;
    if (viaNode === startNode || viaNode === endNode) {
      return setrouteDijkstra(startNode, endNode, adj, Object.assign({}, opts || {}, { _asyncPlanning: false }));
    }
    opts = Object.assign({}, opts || {}, { _asyncPlanning: false });
    var p1 = setrouteDijkstra(startNode, viaNode, adj, opts);
    if (!p1 || p1.length < 2) return null;
    var midMeta = (typeof setrouteDijkstraResultMeta === "function" && setrouteDijkstraResultMeta()) || {};

    var excluded = {};
    for (var i = 0; i < p1.length - 1; i++) {
      excluded[p1[i]] = true;
    }
    if (excluded[endNode]) {
      return pruneNodePathCycles(p1);
    }
    var adj2 = buildAdjacencyExcludingNodes(adj, excluded);
    var p2 = setrouteDijkstra(viaNode, endNode, adj2, Object.assign({}, opts, {
      t0Hours: midMeta.arrivalH != null ? midMeta.arrivalH : (Number(opts.t0Hours) || 0)
    }));
    if (!p2 || p2.length < 2) return null;

    var rawPath = p1.concat(p2.slice(1));
    if (hasHairpinTurnAtVia(rawPath)) return null;
    var path = pruneNodePathCycles(rawPath);
    var score = setroutePathTimedScore(path, opts.speedKnots, opts.stormWeight, opts.t0Hours);
    setrouteDijkstra._lastMeta = {
      cost: score.cost,
      arrivalH: score.arrivalH,
      stormPenalty: score.stormPen,
      timed: true
    };
    return path;
  };

  window.setroutePathViaChainAsync = async function (startNode, endNode, chainNodes, adj, opts) {
    if (!Array.isArray(chainNodes) || !chainNodes.length) return null;
    opts = opts || {};
    var dijk = opts._asyncPlanning ? setrouteDijkstraAsync : setrouteDijkstra;
    var stops = [startNode];
    for (var i = 0; i < chainNodes.length; i++) {
      var k = chainNodes[i];
      if (k && MARITIME_SEA_NODES[k] && stops[stops.length - 1] !== k) {
        stops.push(k);
      }
    }
    if (stops[stops.length - 1] !== endNode) stops.push(endNode);

    var full = [];
    var tCur = Number(opts.t0Hours) || 0;
    var visitedBefore = {};
    for (var s = 0; s < stops.length - 1; s++) {
      if (stops[s] === stops[s + 1]) continue;
      var adjStep = buildAdjacencyExcludingNodes(adj, visitedBefore);
      var seg = await Promise.resolve(dijk(stops[s], stops[s + 1], adjStep, Object.assign({}, opts, { t0Hours: tCur })));
      if (!seg || seg.length < 2) {
        seg = await Promise.resolve(dijk(stops[s], stops[s + 1], adj, Object.assign({}, opts, { t0Hours: tCur })));
      }
      if (!seg || seg.length < 2) return null;
      var meta = (typeof setrouteDijkstraResultMeta === "function" && setrouteDijkstraResultMeta()) || {};
      if (meta.arrivalH != null) tCur = meta.arrivalH;
      for (var vi = 0; vi < seg.length - 1; vi++) {
        visitedBefore[seg[vi]] = true;
      }
      if (full.length === 0) full = seg.slice();
      else full = full.concat(seg.slice(1));
    }
    full = pruneNodePathCycles(full);
    var score = setroutePathTimedScore(full, opts.speedKnots, opts.stormWeight, opts.t0Hours);
    setrouteDijkstra._lastMeta = {
      cost: score.cost,
      arrivalH: score.arrivalH,
      stormPenalty: score.stormPen,
      timed: true
    };
    return full;
  };

  // ---------------------------------------------------------------------------
  // 5. CALIBRATE CORRIDOR TEMPLATES & DIJKSTRA-STITCHED TEMPLATE CORRIDORS
  // ---------------------------------------------------------------------------
  var CALIBRATED_TEMPLATES = [
    {
      id: "fareast_china_us_gulf_panama",
      originHints: ["tianjin", "xingang", "shanghai", "ningbo", "qingdao", "dalian", "busan", "tokyo", "hong kong", "kaohsiung"],
      destHints: ["houston", "galveston", "new orleans", "corpus"],
      nodeKeys: [
        "EAST_CHINA_SEA", "OSUMI_STRAIT", "SHIONOMISAKI_OFF", "IZU_OSHIMA_S", "NOJIMAZAKI_OFF",
        "NPAC_GC_WEST", "NPAC_GC_MID", "NPAC_GC_EAST", "LONG_BEACH_APP", "MANZANILLO_APP",
        "PACIFIC_PANAMA_APP", "PANAMA_BALBOA", "PANAMA_COLON", "CARIBBEAN_MID", "YUCATAN_CH",
        "GULF_MEXICO_MID", "HOUSTON_APP"
      ]
    },
    {
      id: "fareast_uswc_npac",
      originHints: ["tianjin", "shanghai", "ningbo", "busan", "tokyo", "osaka"],
      destHints: ["los angeles", "long beach", "san francisco", "oakland", "seattle", "vancouver"],
      nodeKeys: [
        "EAST_CHINA_SEA", "OSUMI_STRAIT", "SHIONOMISAKI_OFF", "IZU_OSHIMA_S", "NOJIMAZAKI_OFF",
        "NPAC_GC_WEST", "NPAC_GC_MID", "NPAC_GC_EAST"
      ]
    },
    {
      id: "med_asia_suez",
      originHints: ["rotterdam", "hamburg", "antwerp", "bremerhaven", "felixstowe", "southampton", "le havre", "gibraltar", "piraeus"],
      destHints: ["singapore", "shanghai", "ningbo", "qingdao", "tianjin", "hong kong", "shenzhen", "kaohsiung", "busan", "tokyo", "yokohama"],
      nodeKeys: [
        "DOVER_STRAIT", "ENGLISH_CHANNEL_MID", "CASQUETS", "USHANT", "BISCAY_MID", "FINISTERRE", "ST_VINCENT",
        "GIBRALTAR_W", "GIBRALTAR_MID", "GIBRALTAR_E", "MED_WEST", "MED_SICILY", "MED_MALTA", "MED_CRETE",
        "PORT_SAID_APP", "SUEZ_CANAL_MID", "SUEZ_SOUTH", "RED_SEA_JUBAL", "RED_SEA_MID",
        "RED_SEA_SOUTH", "BAB_EL_MANDEB", "GULF_OF_ADEN", "SOCOTRA_N", "ARABIAN_SEA_MID", "DONDRA_HEAD",
        "SIX_DEGREE_CH", "MALACCA_N", "MALACCA_MID", "MALACCA_S", "SINGAPORE_W", "SINGAPORE_MAIN", "SINGAPORE_E"
      ]
    },
    {
      id: "arabian_uswc_malacca_npac",
      originHints: ["salalah", "muscat", "sohar", "dubai", "jebel ali", "fujairah", "dammam", "ras tanura", "kuwait", "karachi", "mumbai", "nhava sheva", "mundra", "colombo"],
      destHints: ["san francisco", "oakland", "los angeles", "long beach", "seattle", "tacoma", "vancouver"],
      nodeKeys: [
        "ARABIAN_SEA_MID", "DONDRA_HEAD", "SIX_DEGREE_CH", "MALACCA_N", "MALACCA_MID", "MALACCA_S",
        "SINGAPORE_W", "SINGAPORE_MAIN", "SINGAPORE_E", "NATUNA_CORRIDOR", "SCS_SOUTH", "SCS_MID",
        "SCS_NORTH", "LUZON_STRAIT", "OKINAWA_SE", "SHIONOMISAKI_OFF", "IZU_OSHIMA_S", "NOJIMAZAKI_OFF",
        "NPAC_GC_WEST", "NPAC_GC_MID", "NPAC_GC_EAST"
      ]
    }
  ];

  var _origLoadCorridorTemplates = typeof window.loadSetrouteCorridorTemplates === "function"
    ? window.loadSetrouteCorridorTemplates
    : null;
  var _origMatchCorridorTemplate = typeof window.setrouteMatchCorridorTemplate === "function"
    ? window.setrouteMatchCorridorTemplate
    : null;

  window.loadSetrouteCorridorTemplates = async function (force) {
    if (_origLoadCorridorTemplates) {
      try { await _origLoadCorridorTemplates(force); } catch (eLoad) {}
    }
    return CALIBRATED_TEMPLATES;
  };

  window.setrouteMatchCorridorTemplate = function (origName, destName) {
    var o = String(origName || "").toLowerCase();
    var d = String(destName || "").toLowerCase();
    for (var i = 0; i < CALIBRATED_TEMPLATES.length; i++) {
      var t = CALIBRATED_TEMPLATES[i];
      if (!t || !Array.isArray(t.nodeKeys) || t.nodeKeys.length < 3) continue;
      var oh = t.originHints.some(function (h) { return o.indexOf(h) >= 0; });
      var dh = t.destHints.some(function (h) { return d.indexOf(h) >= 0; });
      if (oh && dh) return { id: t.id, nodeKeys: t.nodeKeys.slice() };
      var ohRev = t.destHints.some(function (h) { return o.indexOf(h) >= 0; });
      var dhRev = t.originHints.some(function (h) { return d.indexOf(h) >= 0; });
      if (ohRev && dhRev) return { id: t.id + "_rev", nodeKeys: t.nodeKeys.slice().reverse() };
    }
    return _origMatchCorridorTemplate ? _origMatchCorridorTemplate(origName, destName) : null;
  };

  // Stitch template milestones using Dijkstra shortest-sea path between consecutive milestones
  window.setrouteStitchTemplateCorridor = function (startNode, endNode, templateKeys, adj) {
    if (!Array.isArray(templateKeys) || templateKeys.length < 2) return null;
    var activeAdj = adj || window.setrouteBuildAdjacency(false);
    var milestones = [startNode];
    for (var i = 0; i < templateKeys.length; i++) {
      var k = templateKeys[i];
      if (k && MARITIME_SEA_NODES[k] && milestones[milestones.length - 1] !== k) {
        milestones.push(k);
      }
    }
    if (milestones[milestones.length - 1] !== endNode) {
      milestones.push(endNode);
    }

    var full = [];
    for (var m = 0; m < milestones.length - 1; m++) {
      var u = milestones[m];
      var v = milestones[m + 1];
      if (u === v) continue;
      var seg = setrouteDijkstra(u, v, activeAdj, { stormWeight: 0, _forceStatic: true });
      if (!seg || seg.length < 2) return null;
      if (full.length === 0) full = seg.slice();
      else full = full.concat(seg.slice(1));
    }
    full = pruneNodePathCycles(full);
    return setrouteValidateNodePath(full, activeAdj) ? full : null;
  };

  // ---------------------------------------------------------------------------
  // 6. TIGHTEN SURGICAL REPAIR, SEA-NODE BYPASS & TURN EASING (NO YO-YO LOOPS)
  // ---------------------------------------------------------------------------
  // Always returns [key] Array (or null) matching setsail_core.js finalizeCorridor contract
  window.setrouteFindSeaNodeBypass = function (lat1, lon1, lat2, lon2, usedKeys) {
    var used = {};
    if (Array.isArray(usedKeys)) {
      for (var u = 0; u < usedKeys.length; u++) used[usedKeys[u]] = true;
    }
    var directDist = calculateHaversineDistanceNM(lat1, lon1, lat2, lon2);
    // Strict local detour bound: never allow a +1400 NM jump on a short coastal leg
    var maxTotalDist = Math.min(directDist * 1.65, directDist + 185);
    var legBrg = typeof calculateInitialBearingDeg === "function"
      ? calculateInitialBearingDeg(lat1, lon1, lat2, lon2)
      : 0;

    var bestKey = null;
    var bestScore = Infinity;
    var keys = Object.keys(MARITIME_SEA_NODES);
    for (var i = 0; i < keys.length; i++) {
      var k = keys[i];
      if (used[k]) continue;
      var n = MARITIME_SEA_NODES[k];
      if (!n) continue;
      if (window.setroutePointInLandBox(n[0], n[1])) continue;
      var d1 = calculateHaversineDistanceNM(lat1, lon1, n[0], n[1]);
      var d2 = calculateHaversineDistanceNM(n[0], n[1], lat2, lon2);
      if (d1 < 2 || d2 < 2) continue;
      if (d1 + d2 > maxTotalDist) continue;

      // Reject any bypass node that points backward (> 90 deg deflection from leg bearing)
      if (typeof calculateInitialBearingDeg === "function" && typeof setrouteTurnAngleDeg === "function") {
        var b1 = calculateInitialBearingDeg(lat1, lon1, n[0], n[1]);
        var b2 = calculateInitialBearingDeg(n[0], n[1], lat2, lon2);
        if (setrouteTurnAngleDeg(legBrg, b1) > 88) continue;
        if (setrouteTurnAngleDeg(b1, b2) > 95) continue;
      }

      if (window.setrouteLegLikelyCrossesLand(lat1, lon1, n[0], n[1])) continue;
      if (window.setrouteLegLikelyCrossesLand(n[0], n[1], lat2, lon2)) continue;
      var score = d1 + d2 +
        window.setrouteEdgeHazardPenalty(lat1, lon1, n[0], n[1]) +
        window.setrouteEdgeHazardPenalty(n[0], n[1], lat2, lon2);
      if (score < bestScore) {
        bestScore = score;
        bestKey = k;
      }
    }
    return bestKey ? [bestKey] : null;
  };

  // Remove any hairpin spikes or spatial loops from assembled waypoints
  function cleanWaypointBacktracks(waypoints) {
    if (!Array.isArray(waypoints) || waypoints.length < 4) return waypoints;
    var list = waypoints.slice();

    // Pass 1: Collapse spatial return loops (W[i] and W[j] within 35 NM with > 90 NM loop in between)
    var loopChanged = true;
    var loopGuard = 0;
    while (loopChanged && loopGuard++ < 12) {
      loopChanged = false;
      for (var i = 0; i < list.length - 3; i++) {
        for (var j = list.length - 1; j >= i + 2; j--) {
          if (i === 0 && j === list.length - 1) continue;
          var wi = list[i];
          var wj = list[j];
          var direct = calculateHaversineDistanceNM(wi.lat, wi.lon, wj.lat, wj.lon);
          var subDist = 0;
          for (var k = i; k < j; k++) {
            subDist += calculateHaversineDistanceNM(list[k].lat, list[k].lon, list[k + 1].lat, list[k + 1].lon);
          }
          if (subDist > Math.max(direct * 2.35, direct + 85) &&
              direct < 260 &&
              !window.setrouteLegLikelyCrossesLand(wi.lat, wi.lon, wj.lat, wj.lon)) {
            list.splice(i + 1, j - i - 1);
            loopChanged = true;
            break;
          }
        }
        if (loopChanged) break;
      }
    }

    // Pass 2: Remove sharp > 125-deg single-vertex hairpin spikes
    var spikeChanged = true;
    var spikeGuard = 0;
    while (spikeChanged && spikeGuard++ < 10) {
      spikeChanged = false;
      for (var s = 1; s < list.length - 1; s++) {
        var prev = list[s - 1];
        var cur = list[s];
        var next = list[s + 1];
        if (typeof calculateInitialBearingDeg === "function" && typeof setrouteTurnAngleDeg === "function") {
          var bIn = calculateInitialBearingDeg(prev.lat, prev.lon, cur.lat, cur.lon);
          var bOut = calculateInitialBearingDeg(cur.lat, cur.lon, next.lat, next.lon);
          var turn = setrouteTurnAngleDeg(bIn, bOut);
          if (turn > 125 && !window.setrouteLegLikelyCrossesLand(prev.lat, prev.lon, next.lat, next.lon)) {
            list.splice(s, 1);
            spikeChanged = true;
            break;
          }
        }
      }
    }

    for (var idx = 0; idx < list.length; idx++) {
      list[idx].wptNo = ("00" + (idx + 1)).slice(-3);
      list[idx].id = idx + 1;
    }
    return list;
  }
  window.setrouteCleanWaypointBacktracks = cleanWaypointBacktracks;

  window.setrouteSurgicalRepairWaypoints = function (waypoints, speed, xtd, sailMode) {
    if (!Array.isArray(waypoints) || waypoints.length < 2) {
      return { waypoints: waypoints || [], repairs: 0 };
    }
    var list = cleanWaypointBacktracks(waypoints);
    var usedKeys = [];
    for (var u = 0; u < list.length; u++) {
      if (list[u] && list[u].seaNodeKey) usedKeys.push(list[u].seaNodeKey);
    }
    var repairs = 0;

    for (var pass = 0; pass < 3; pass++) {
      var changed = false;
      var next = [list[0]];
      for (var i = 0; i < list.length - 1; i++) {
        var a = list[i];
        var b = list[i + 1];
        if (window.setrouteLegLikelyCrossesLand(a.lat, a.lon, b.lat, b.lon)) {
          var bypass = window.setrouteFindSeaNodeBypass(a.lat, a.lon, b.lat, b.lon, usedKeys);
          var keysToInsert = Array.isArray(bypass) ? bypass : (bypass ? [bypass] : []);
          for (var bi = 0; bi < keysToInsert.length; bi++) {
            var k1 = keysToInsert[bi];
            var n1 = MARITIME_SEA_NODES[k1];
            if (!n1) continue;
            usedKeys.push(k1);
            next.push({
              wptNo: "000",
              name: n1[2] || k1,
              lat: Number(n1[0].toFixed(4)),
              lon: Number(n1[1].toFixed(4)),
              speedKnots: speed || a.speedKnots || 14.5,
              portsideXTD: xtd || a.portsideXTD || 0.5,
              starboardXTD: xtd || a.starboardXTD || 0.5,
              turnRadius: 0.8,
              sail: sailMode || a.sail || "RL",
              rot: 10.0,
              seaNodeKey: k1
            });
            repairs++;
            changed = true;
          }
        }
        next.push(b);
      }
      list = next;
      if (!changed) break;
    }

    list = cleanWaypointBacktracks(list);
    return { waypoints: list, repairs: repairs };
  };

  // Calibrated turn splitting: only ease turns >= 88 deg with at most 2 clean arc waypoints (no '/' in names)
  window.setrouteSplitSharpTurns = function (waypoints, optsOrSpeed, xtdArg, sailArg) {
    if (!Array.isArray(waypoints) || waypoints.length < 3) return waypoints || [];
    var sharpThresh = (optsOrSpeed && typeof optsOrSpeed === "object" && optsOrSpeed.sharpDeg)
      ? Math.max(85, Number(optsOrSpeed.sharpDeg))
      : 88;
    var cleaned = cleanWaypointBacktracks(waypoints);
    var out = [cleaned[0]];
    for (var i = 1; i < cleaned.length - 1; i++) {
      var prev = out[out.length - 1];
      var cur = cleaned[i];
      var next = cleaned[i + 1];
      var spd = cur.speedKnots || (typeof optsOrSpeed === "number" ? optsOrSpeed : 14.5);
      var xtd = cur.portsideXTD || xtdArg || 0.5;
      var sail = cur.sail || sailArg || "RL";
      var dIn = calculateHaversineDistanceNM(prev.lat, prev.lon, cur.lat, cur.lon);
      var dOut = calculateHaversineDistanceNM(cur.lat, cur.lon, next.lat, next.lon);
      var b1 = calculateInitialBearingDeg(prev.lat, prev.lon, cur.lat, cur.lon);
      var b2 = calculateInitialBearingDeg(cur.lat, cur.lon, next.lat, next.lon);
      var turn = setrouteTurnAngleDeg(b1, b2);

      if (turn > sharpThresh && dIn > 22 && dOut > 22) {
        var pA = setrouteLerpLatLon(prev.lat, prev.lon, cur.lat, cur.lon, 0.84);
        var pB = setrouteLerpLatLon(cur.lat, cur.lon, next.lat, next.lon, 0.16);
        if (!window.setroutePointInLandBox(pA[0], pA[1]) &&
            !window.setroutePointInLandBox(pB[0], pB[1]) &&
            !window.setrouteLegLikelyCrossesLand(pA[0], pA[1], pB[0], pB[1])) {
          out.push({
            wptNo: "000",
            name: (cur.name || "WPT") + " (Turn Approach)",
            lat: Number(pA[0].toFixed(4)),
            lon: Number(pA[1].toFixed(4)),
            speedKnots: spd,
            portsideXTD: xtd,
            starboardXTD: xtd,
            turnRadius: 0.9,
            sail: sail,
            rot: 8.0
          });
          out.push({
            wptNo: "000",
            name: (cur.name || "WPT") + " (Turn Exit)",
            lat: Number(pB[0].toFixed(4)),
            lon: Number(pB[1].toFixed(4)),
            speedKnots: spd,
            portsideXTD: xtd,
            starboardXTD: xtd,
            turnRadius: 0.9,
            sail: sail,
            rot: 8.0
          });
          continue;
        }
      }
      out.push(cur);
    }
    out.push(cleaned[cleaned.length - 1]);
    out = cleanWaypointBacktracks(out);
    return out;
  };

  // Override setrouteDensifyWaypoints to remove un-bounded SETROUTE_OCEAN_HUBS.find() off-track hub teleportation
  window.setrouteDensifyWaypoints = function (waypoints, maxLegNm) {
    var maxNm = Number(maxLegNm) || 350;
    if (!Array.isArray(waypoints) || waypoints.length < 2) return waypoints;
    var out = [waypoints[0]];
    for (var i = 0; i < waypoints.length - 1; i++) {
      var a = waypoints[i];
      var b = waypoints[i + 1];
      var dist = calculateHaversineDistanceNM(a.lat, a.lon, b.lat, b.lon);
      if (dist > maxNm) {
        var n = Math.min(12, Math.max(1, Math.ceil(dist / maxNm) - 1));
        for (var s = 1; s <= n; s++) {
          var p = setrouteLerpLatLon(a.lat, a.lon, b.lat, b.lon, s / (n + 1));
          if (window.setroutePointInLandBox(p[0], p[1])) continue;
          out.push({
            wptNo: "TMP",
            name: "Ocean track",
            lat: Number(Number(p[0]).toFixed(5)),
            lon: Number(Number(p[1]).toFixed(5)),
            speedKnots: a.speedKnots,
            portsideXTD: a.portsideXTD,
            starboardXTD: a.starboardXTD,
            turnRadius: 0.8,
            sail: a.sail || "GC",
            rot: 8.0
          });
        }
      }
      out.push(b);
    }
    for (var idx = 0; idx < out.length; idx++) {
      out[idx].wptNo = ("00" + (idx + 1)).slice(-3);
      out[idx].id = idx + 1;
    }
    return out;
  };

  // ---------------------------------------------------------------------------
  // 7. CALIBRATE CORRIDOR TOURNAMENT & ARABIAN SEA -> TRANSPACIFIC ROUTING
  // ---------------------------------------------------------------------------
  function isArabianOrNorthIndianPort(c) {
    return Array.isArray(c) && c[1] >= 43 && c[1] <= 98 && c[0] >= 4 && c[0] <= 31;
  }

  function isUsWestCoastPort(c) {
    return Array.isArray(c) && c[1] <= -114 && c[1] >= -135 && c[0] >= 28 && c[0] <= 55;
  }

  function resolveCalMinDepthM(opts) {
    if (!opts) return 0;
    var d = Number(opts.minDepthM);
    if (Number.isFinite(d) && d > 0) return d;
    var dr = Number(opts.draftMeters);
    if (Number.isFinite(dr) && dr > 0) {
      var ukc = Number(opts.ukcMeters);
      return dr + (Number.isFinite(ukc) && ukc > 0 ? ukc : 4.0);
    }
    return 0;
  }

  var _origFindMaritimeSeaCorridor = typeof window.findMaritimeSeaCorridor === "function"
    ? window.findMaritimeSeaCorridor
    : null;

  window.findMaritimeSeaCorridor = async function (origCoords, destCoords, options) {
    applyGraphNodeAndBoxFixes();
    options = options || {};

    var reqDepth = resolveCalMinDepthM(options);
    var hadPrevDepth = reqDepth > 0;
    var prevMinDepth = window.SETROUTE_MIN_DEPTH_M;
    if (hadPrevDepth) {
      window.SETROUTE_MIN_DEPTH_M = reqDepth;
    }

    try {
      window.setrouteBuildAdjacency(false);

      // Arabian Sea / Persian Gulf / W. India <-> US West Coast: evaluate Malacca -> Luzon/SCS -> Pacific offshore -> N.Pac GC
      var arabianToUswc = (isArabianOrNorthIndianPort(origCoords) && isUsWestCoastPort(destCoords)) ||
                          (isUsWestCoastPort(origCoords) && isArabianOrNorthIndianPort(destCoords));

      if (arabianToUswc && !options.viaCape && !options.viaSuez && !options.viaPanama && !options.customViaNodes) {
        var fwdChain = [
          "ARABIAN_SEA_MID", "DONDRA_HEAD", "SIX_DEGREE_CH", "MALACCA_N", "MALACCA_MID", "MALACCA_S",
          "SINGAPORE_W", "SINGAPORE_MAIN", "SINGAPORE_E", "NATUNA_CORRIDOR", "SCS_SOUTH", "SCS_MID",
          "SCS_NORTH", "LUZON_STRAIT", "OKINAWA_SE", "SHIONOMISAKI_OFF", "IZU_OSHIMA_S", "NOJIMAZAKI_OFF",
          "NPAC_GC_WEST", "NPAC_GC_MID", "NPAC_GC_EAST"
        ];
        options = Object.assign({}, options, {
          customViaNodes: isArabianOrNorthIndianPort(origCoords) ? fwdChain : fwdChain.slice().reverse(),
          customRouteMode: "via_malacca_npac_gc"
        });
      }

      var res = _origFindMaritimeSeaCorridor
        ? await _origFindMaritimeSeaCorridor(origCoords, destCoords, options)
        : null;

      if (Array.isArray(res)) {
        res = pruneNodePathCycles(res);
        if (window.findMaritimeSeaCorridor._lastMeta) {
          window.findMaritimeSeaCorridor._lastMeta.nodePath = res.slice();
          window.findMaritimeSeaCorridor._lastMeta.hops = res.length;
        }
      }
      return res;
    } finally {
      if (hadPrevDepth) {
        window.SETROUTE_MIN_DEPTH_M = prevMinDepth;
      }
    }
  };

  // Prevent setrouteAltCorridorRetries from sending Arabian Sea -> USWC via Cape of Good Hope first
  var _origAltCorridorRetries = typeof window.setrouteAltCorridorRetries === "function"
    ? window.setrouteAltCorridorRetries
    : null;

  window.setrouteAltCorridorRetries = function (origCoords, destCoords) {
    if ((isArabianOrNorthIndianPort(origCoords) && isUsWestCoastPort(destCoords)) ||
        (isUsWestCoastPort(origCoords) && isArabianOrNorthIndianPort(destCoords))) {
      return [
        { viaMalacca: true, viaCape: false, viaSuez: false, viaPanama: false, label: "Malacca" },
        { viaLombok: true, viaCape: false, viaSuez: false, viaPanama: false, label: "Lombok" },
        { viaSunda: true, viaCape: false, viaSuez: false, viaPanama: false, label: "Sunda" }
      ];
    }
    return _origAltCorridorRetries ? _origAltCorridorRetries(origCoords, destCoords) : [];
  };

  // Ensure generateAlgorithmicMaritimeRoute always runs final backtrack cleaner & accurate corridor metadata
  var _origGenerateAlgorithmicMaritimeRoute = typeof window.generateAlgorithmicMaritimeRoute === "function"
    ? window.generateAlgorithmicMaritimeRoute
    : null;

  if (_origGenerateAlgorithmicMaritimeRoute) {
    window.generateAlgorithmicMaritimeRoute = async function (pOrig, pDest, origCoords, destCoords, speed, xtd, sailMode, options) {
      var reqDepth = resolveCalMinDepthM(options);
      var hadPrevDepth = reqDepth > 0;
      var prevMinDepth = window.SETROUTE_MIN_DEPTH_M;
      if (hadPrevDepth) {
        window.SETROUTE_MIN_DEPTH_M = reqDepth;
      }
      try {
        var route = await _origGenerateAlgorithmicMaritimeRoute(pOrig, pDest, origCoords, destCoords, speed, xtd, sailMode, options);
        if (route && Array.isArray(route.waypoints) && route.waypoints.length >= 2) {
          route.waypoints = cleanWaypointBacktracks(route.waypoints);
          // Sync route name with actual nodePath so title never contradicts geography
          var np = (route.metadata && route.metadata.coreA && route.metadata.coreA.nodePath) || [];
          var hasSuez = np.indexOf("SUEZ_CANAL_MID") !== -1 || np.indexOf("PORT_SAID_APP") !== -1;
          var hasCape = np.indexOf("CAPE_AGULHAS") !== -1 || np.indexOf("CAPE_GOOD_HOPE") !== -1;
          var hasPanama = np.indexOf("PANAMA_BALBOA") !== -1 || np.indexOf("PANAMA_COLON") !== -1;
          var hasMalaccaNpac = (np.indexOf("MALACCA_MID") !== -1 || np.indexOf("SINGAPORE_MAIN") !== -1) &&
                               (np.indexOf("NPAC_GC_MID") !== -1 || np.indexOf("NPAC_GC_WEST") !== -1);
          if (hasSuez) {
            route.name = pOrig.name + " to " + pDest.name + " (Via Suez Canal)";
          } else if (hasPanama) {
            route.name = pOrig.name + " to " + pDest.name + " (Via Panama Canal)";
          } else if (hasMalaccaNpac) {
            route.name = pOrig.name + " to " + pDest.name + " (Via Malacca & North Pacific)";
          } else if (hasCape) {
            route.name = pOrig.name + " to " + pDest.name + " (Via Cape of Good Hope)";
          }
          route.routeName = route.name;
        }
        return route;
      } finally {
        if (hadPrevDepth) {
          window.SETROUTE_MIN_DEPTH_M = prevMinDepth;
        }
      }
    };
  }

  // Initialize calibrated graph immediately
  try {
    applyGraphNodeAndBoxFixes();
    if (typeof window.setrouteBuildAdjacency === "function") {
      window.setrouteBuildAdjacency(true);
    }
  } catch (eInit) {
    console.warn("[SetRoute Calibration] Init warning:", eInit);
  }
})();
