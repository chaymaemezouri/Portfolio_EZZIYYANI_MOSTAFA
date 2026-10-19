"""Download available AcademicSkills assets into public/assets/academyskills/."""
from pathlib import Path
import requests

ROOT = Path(__file__).resolve().parents[1] / "public" / "assets" / "academyskills"
H = {"User-Agent": "Mozilla/5.0"}

FILES = [
    ("https://academyskills.net/ezziyyani/research/patentes/patente1.pdf", "patents/brevet-1-lirci.pdf"),
    ("https://academyskills.net/ezziyyani/research/images/patente-01.jpg", "patents/brevet-1.jpg"),
    ("https://academyskills.net/ezziyyani/research/images/E-Orchestra.jpg", "patents/brevet-2-orchestra.jpg"),
    ("https://academyskills.net/ezziyyani/research/images/deaft.jpg", "patents/brevet-3-conduite.jpg"),
    ("https://academyskills.net/ezziyyani/research/videos/Video.mp4", "patents/brevet-2-orchestra.mp4"),
]


def main():
    for url, rel in FILES:
        dest = ROOT / rel
        dest.parent.mkdir(parents=True, exist_ok=True)
        if dest.exists() and dest.stat().st_size > 1000:
            print(f"skip (exists) {rel} ({dest.stat().st_size} bytes)")
            continue
        print(f"GET {url}")
        with requests.get(url, headers=H, timeout=120, stream=True) as response:
            response.raise_for_status()
            with dest.open("wb") as handle:
                for chunk in response.iter_content(chunk_size=1024 * 256):
                    if chunk:
                        handle.write(chunk)
        print(f"  -> {rel} ({dest.stat().st_size} bytes)")


if __name__ == "__main__":
    main()
