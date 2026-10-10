"""Make transparent, seekable web assets from the approved phone videos.

Only the area outside the phone is masked. White UI inside the phone stays opaque.
Requires ffmpeg and Pillow; see README.md for the input arguments.
"""
import argparse
import json
import subprocess
import tempfile
from pathlib import Path

from PIL import Image, ImageChops, ImageDraw


def export_sequence(source, destination, fps, width):
    destination.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory(prefix="tagalong-frames-") as temporary:
        subprocess.run([
            "ffmpeg", "-v", "error", "-i", str(source), "-vf", f"fps={fps}",
            str(Path(temporary) / "%04d.png"),
        ], check=True)
        # Four-times supersampling gives the phone edge a smooth alpha channel.
        mask = Image.new("L", (2000, 4000), 0)
        draw = ImageDraw.Draw(mask)
        draw.rounded_rectangle((72, 40, 1928, 3960), radius=244, fill=255)
        for bounds in [(60, 792, 80, 1048), (60, 1140, 80, 1396), (1920, 1020, 1944, 1372)]:
            draw.rounded_rectangle(bounds, radius=8, fill=255)
        mask = mask.resize((500, 1000), Image.Resampling.LANCZOS)
        paths = sorted(Path(temporary).glob("*.png"))
        for number, path in enumerate(paths):
            image = Image.open(path).convert("RGBA")
            image.putalpha(ImageChops.multiply(image.getchannel("A"), mask))
            image = image.resize((width, width * 2), Image.Resampling.LANCZOS)
            image.save(destination / f"{number:03d}.webp", quality=81, method=5)
        first = destination / "000.webp"
        (destination / "poster.webp").write_bytes(first.read_bytes())
        still = destination / f"{min(len(paths) - 1, round(len(paths) * .91)):03d}.webp"
        (destination / "still.webp").write_bytes(still.read_bytes())
        return {"frames": len(paths), "fps": fps, "width": width, "height": width * 2}


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--calendar", type=Path, required=True)
    parser.add_argument("--swipes", type=Path, required=True)
    parser.add_argument("--output", type=Path, default=Path("public/media/phones"))
    parser.add_argument("--fps", type=int, default=12)
    parser.add_argument("--width", type=int, default=420)
    args = parser.parse_args()
    manifest = {
        "calendar": export_sequence(args.calendar, args.output / "calendar", args.fps, args.width),
        "swipes": export_sequence(args.swipes, args.output / "swipes", args.fps, args.width),
    }
    (args.output / "manifest.json").write_text(json.dumps(manifest, indent=2) + "\n")
    print(json.dumps(manifest, indent=2))
