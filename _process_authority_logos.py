# -*- coding: utf-8 -*-
"""Process Home marquee logos: Taiwan Navy, JCG, AMSA, BSH."""
from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent
OUT = ROOT / "assets" / "authority-logos"
OUT_PUBLIC = ROOT / "public" / "assets" / "authority-logos"
SRC = Path(r"C:\Users\micha\.cursor\projects\c-Users-micha-setsail-v545-push\assets")

FILES = {
    "taiwan-navy": SRC
    / "c__Users_micha_AppData_Roaming_Cursor_User_workspaceStorage_db3e9527e52bb746e3977db820c5ed01_images_image-5aa3885f-c736-4264-9772-f8843af205f1.png",
    "jcg": SRC
    / "c__Users_micha_AppData_Roaming_Cursor_User_workspaceStorage_db3e9527e52bb746e3977db820c5ed01_images_image-4cebd758-6ab7-46bd-a4c1-418df0775d73.png",
    "amsa": SRC
    / "c__Users_micha_AppData_Roaming_Cursor_User_workspaceStorage_db3e9527e52bb746e3977db820c5ed01_images_image-b08100c0-db07-4e35-8cb8-0d6a92181de1.png",
    "bsh": SRC
    / "c__Users_micha_AppData_Roaming_Cursor_User_workspaceStorage_db3e9527e52bb746e3977db820c5ed01_images_image-9ecb18b6-3c2c-4ee2-9e67-c0005ec3db17.png",
}


def save(im: Image.Image, name: str):
    OUT.mkdir(parents=True, exist_ok=True)
    OUT_PUBLIC.mkdir(parents=True, exist_ok=True)
    path = OUT / f"{name}.png"
    im.save(path, "PNG", optimize=True)
    (OUT_PUBLIC / f"{name}.png").write_bytes(path.read_bytes())
    print("wrote", path, im.size, im.mode)


def remove_near_color(im: Image.Image, color, tol=28, soft=12) -> Image.Image:
    """Make pixels near `color` transparent (soft edge)."""
    im = im.convert("RGBA")
    px = im.load()
    w, h = im.size
    cr, cg, cb = color
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            d = abs(r - cr) + abs(g - cg) + abs(b - cb)
            if d <= tol:
                px[x, y] = (r, g, b, 0)
            elif d <= tol + soft:
                na = int(a * (d - tol) / soft)
                px[x, y] = (r, g, b, na)
    return im


def trim_alpha(im: Image.Image, pad=4) -> Image.Image:
    bbox = im.split()[-1].getbbox()
    if not bbox:
        return im
    l, t, r, b = bbox
    l = max(0, l - pad)
    t = max(0, t - pad)
    r = min(im.width, r + pad)
    b = min(im.height, b + pad)
    return im.crop((l, t, r, b))


def circle_crop(im: Image.Image) -> Image.Image:
    im = im.convert("RGBA")
    # Square crop to content, then circular mask keeping fill
    w, h = im.size
    side = min(w, h)
    left = (w - side) // 2
    top = (h - side) // 2
    sq = im.crop((left, top, left + side, top + side))
    mask = Image.new("L", (side, side), 0)
    ImageDraw.Draw(mask).ellipse((0, 0, side - 1, side - 1), fill=255)
    out = Image.new("RGBA", (side, side), (0, 0, 0, 0))
    out.paste(sq, (0, 0))
    out.putalpha(mask)
    return out


def process_taiwan():
    im = Image.open(FILES["taiwan-navy"])
    # Black background
    im = remove_near_color(im, (0, 0, 0), tol=40, soft=18)
    im = trim_alpha(im, pad=6)
    # Downscale for marquee mark
    im.thumbnail((160, 160), Image.Resampling.LANCZOS)
    save(im, "taiwan-navy")


def process_jcg():
    im = Image.open(FILES["jcg"])
    im = remove_near_color(im, (255, 255, 255), tol=30, soft=14)
    im = trim_alpha(im, pad=4)
    im.thumbnail((220, 100), Image.Resampling.LANCZOS)
    save(im, "jcg")


def process_amsa():
    im = Image.open(FILES["amsa"])
    # Dark navy blue background ~ #0a1f3d-ish; sample corner
    corner = im.convert("RGB").getpixel((5, 5))
    print("AMSA bg sample", corner)
    im = remove_near_color(im, corner, tol=55, soft=20)
    im = trim_alpha(im, pad=6)
    im.thumbnail((200, 100), Image.Resampling.LANCZOS)
    save(im, "amsa")


def process_bsh():
    im = Image.open(FILES["bsh"])
    # Keep blue fill; circular crop only
    im = circle_crop(im)
    im.thumbnail((120, 120), Image.Resampling.LANCZOS)
    save(im, "bsh")


if __name__ == "__main__":
    process_taiwan()
    process_jcg()
    process_amsa()
    process_bsh()
    print("done")
