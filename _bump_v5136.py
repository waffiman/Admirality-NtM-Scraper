# -*- coding: utf-8 -*-
from pathlib import Path
import re
import shutil

ROOT = Path(__file__).resolve().parent
VER = "5.136"


def bump(text: str) -> str:
    text = re.sub(r"\?v=5\.1\d+\b", f"?v={VER}", text)
    text = re.sub(r"v5\.1\d+(?!\.\d)", f"v{VER}", text)
    text = re.sub(r"setsail-cache-v5\.1\d+\.\d+", f"setsail-cache-v{VER}.0", text)
    text = re.sub(r"setsail-tiles-cache-v5\.1\d+\.\d+", f"setsail-tiles-cache-v{VER}.0", text)
    text = re.sub(r"Service Worker v5\.1\d+", f"Service Worker v{VER}", text)
    text = re.sub(r"indexOf\('v5\.1\d+'\)", f"indexOf('v{VER}')", text)
    return text


for rel in ("index.html", "sw.js"):
    p = ROOT / rel
    p.write_text(bump(p.read_text(encoding="utf-8")), encoding="utf-8", newline="\n")
    print("bumped", rel)

shutil.copy2(ROOT / "index.html", ROOT / "OPEN_SETSAIL.html")
shutil.copy2(ROOT / "index.html", ROOT / "public" / "index.html")
shutil.copy2(ROOT / "index.html", ROOT / "public" / "OPEN_SETSAIL.html")
shutil.copy2(ROOT / "sw.js", ROOT / "public" / "sw.js")

for rel in (
    "assets/Auto NtM Plotting/setsail_core.js",
    "assets/Auto NtM Plotting/setroute_core_a.js",
    "assets/geo/setroute_iala_marks.json",
    "assets/authority-logos/taiwan-navy.png",
    "assets/authority-logos/jcg.png",
    "assets/authority-logos/amsa.png",
    "assets/authority-logos/bsh.png",
):
    src = ROOT / rel
    if src.exists():
        dst = ROOT / "public" / rel
        dst.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(src, dst)
        print("copied", rel)

print("done", VER)
