import json
import re
from pathlib import Path
from urllib.parse import urljoin

import requests
from bs4 import BeautifulSoup

H = {"User-Agent": "Mozilla/5.0"}


def fetch(url: str):
    response = requests.get(url, timeout=30, headers=H)
    text = response.content.decode("utf-8", errors="replace")
    try:
        text = text.encode("latin-1").decode("utf-8")
    except Exception:
        pass
    return BeautifulSoup(text, "html.parser"), response.url


def text_of(soup: BeautifulSoup) -> str:
    main = soup.select_one("#content") or soup.select_one(".post") or soup.body
    return main.get_text("\n", strip=True) if main else ""


def build_patents():
    soup, base = fetch("https://academyskills.net/ezziyyani/research/Patents.html")
    raw = text_of(soup)
    chunks = re.split(r"(?=Brevet\s*\d+\s*:)", raw)
    patents = []
    for chunk in chunks:
        chunk = chunk.strip()
        if not chunk.startswith("Brevet"):
            continue
        match = re.match(r"Brevet\s*(\d+)\s*:\s*(.+?)(?:\n|$)", chunk)
        if not match:
            continue
        number, title = match.group(1), match.group(2).strip()
        body = chunk[match.end() :].strip()
        body = re.split(r"\n(?:Home|Research interest)\n", body)[0].strip()
        href = ""
        for anchor in soup.select("a[href]"):
            link = anchor.get("href", "")
            if number == "1" and "patente" in link.lower() and link.endswith(".pdf"):
                href = urljoin(base, link)
            if number == "2" and "Video.mp4" in link:
                href = urljoin(base, link)
        title_clean = re.sub(r"\s+", " ", title)
        patents.append(
            {
                "id": f"brevet-{number}",
                "title": {"fr": title_clean, "en": title_clean, "ar": title_clean},
                "number": number,
                "year": "",
                "inventors": "Mostafa Ezziyyani et al.",
                "office": "",
                "summary": {
                    "fr": body[:2500],
                    "en": body[:2500] if number == "2" else "",
                    "ar": "",
                },
                "href": href,
            }
        )
    return patents


def build_innovation():
    soup, _ = fetch("https://academyskills.net/ezziyyani/research/Product5.html")
    mds = text_of(soup)
    mds_desc = ""
    if "MDS-CP est" in mds:
        mds_desc = mds[mds.find("MDS-CP est") :]
        mds_desc = re.split(r"\n(?:Home|List of Products)", mds_desc)[0].strip()
        mds_desc = re.sub(r"\s+", " ", mds_desc)

    products = [
        ("3sd", "3SD", ""),
        ("pccb", "Parental Control of Children's Behavior (PCCB)", ""),
        ("worldtalk", "WorldTalk", ""),
        (
            "orchestra",
            "Orchestra / e-Ochestra",
            "Plateforme d'apprentissage de la direction d'orchestre avec bâton à capteurs et reconnaissance de gestes.",
        ),
        ("mds-cp", "MDS-CP (Mobile Diagnostic System for Collaborative Patients)", mds_desc),
        ("data-analyser", "Data Analyser", ""),
    ]
    rows = []
    for product_id, title, summary in products:
        rows.append(
            {
                "id": product_id,
                "title": {"fr": title, "en": title, "ar": title},
                "summary": {"fr": summary, "en": summary, "ar": ""},
                "href": "https://academyskills.net/ezziyyani/research/Products.html",
            }
        )
    return rows


def build_academic_projects():
    soup, _ = fetch("https://academyskills.net/ezziyyani/research/Projects.html")
    text = text_of(soup)
    parts = re.split(r"Projet\s*(\d+)\s*:", text)
    titles = [
        "Auto-migration de Micro-Data intersites",
        "Systèmes temps-réel multi-critères pour le suivi des patients",
        "Qualité de données temps réel et sûreté des connaissances",
        "Gestion spatiale et temporelle des catastrophes",
        "Ordonnancement et planification dynamique par contraintes",
        "Outils analytiques Big-Data pour la sécurité",
    ]
    rows = []
    index = 1
    while index < len(parts):
        number = parts[index]
        body = parts[index + 1].strip() if index + 1 < len(parts) else ""
        body = re.split(r"\n(?:Home|List of projects)", body)[0].strip()
        body = re.sub(r"\s+", " ", body)
        title_index = int(number) - 1
        title = titles[title_index] if title_index < len(titles) else f"Projet {number}"
        rows.append(
            {
                "id": f"as-projet-{number}",
                "title": {"fr": title, "en": title, "ar": title},
                "category": "research",
                "role": {
                    "fr": "Responsable / porteur",
                    "en": "Principal investigator",
                    "ar": "",
                },
                "summary": {"fr": body, "en": body, "ar": ""},
                "details": [],
                "organization": {"fr": "", "en": "", "ar": ""},
                "country": {"fr": "Maroc", "en": "Morocco", "ar": "المغرب"},
                "year": "",
                "status": "",
                "partners": [],
                "image": "",
                "links": [
                    {
                        "label": "Source",
                        "href": "https://academyskills.net/ezziyyani/research/Projects.html",
                    }
                ],
                "featured": False,
            }
        )
        index += 2
    return rows


def build_courses():
    courses = [
        ("merise", "Merise", "Licence / Master"),
        ("uml", "UML", "Licence / Master"),
        ("bdd", "Bases de données (BD)", "Licence"),
        ("bdda", "Bases de données avancées", "Master"),
        ("pc", "Programmation en C", "Licence"),
        ("pcpp", "Programmation en C++", "Licence"),
        ("pj", "Programmation en Java", "Licence / Master"),
        ("pp", "Programmation en Python", "Licence / Master"),
        ("pr", "Programmation en R", "Master"),
        ("dm", "Data Mining", "Master"),
        ("ma", "Machine Learning", "Master"),
        ("ia", "Intelligence Artificielle (IA)", "Master"),
        ("bi", "Business Intelligence", "Master"),
        ("dw", "Entrepôt de données (Data Warehouse)", "Master"),
        ("access", "Access", "Licence"),
        ("ss", "SQL Server", "Licence / Master"),
        ("oracle", "Oracle", "Master"),
    ]
    return [
        {
            "id": course_id,
            "title": title,
            "level": level,
            "resources": [
                {
                    "kind": "support",
                    "title": "Page du cours (AcademicSkills)",
                    "href": f"https://academyskills.net/ezziyyani/Teaching/{course_id}.html",
                }
            ],
        }
        for course_id, title, level in courses
    ]


def main():
    payload = {
        "patents": build_patents(),
        "innovation": build_innovation(),
        "academicProjects": build_academic_projects(),
        "courses": build_courses(),
    }
    path = Path(__file__).with_name("import_academyskills.json")
    path.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
    print("Wrote", path)
    for key, rows in payload.items():
        print(f"- {key}: {len(rows)}")


if __name__ == "__main__":
    main()
