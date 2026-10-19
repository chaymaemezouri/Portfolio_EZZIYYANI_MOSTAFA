import json
import time
from collections import deque
from urllib.parse import urljoin, urlparse

import requests
import trafilatura
from bs4 import BeautifulSoup

START_URL = "https://academyskills.net/ezziyyani/"
BASE_PATH = "/ezziyyani/"
DOMAIN = urlparse(START_URL).netloc

session = requests.Session()
session.headers.update({
    "User-Agent": "Mozilla/5.0 (compatible; ContentExtractor/1.0)",
})

visited = set()
queue = deque([START_URL])
pages = []

while queue:
    url = queue.popleft().split("#")[0]

    if url in visited:
        continue

    visited.add(url)

    try:
        response = session.get(url, timeout=20)
        response.raise_for_status()

        if "text/html" not in response.headers.get("Content-Type", ""):
            continue

        soup = BeautifulSoup(response.text, "html.parser")
        title = soup.title.get_text(" ", strip=True) if soup.title else ""

        content = trafilatura.extract(
            response.text,
            include_tables=True,
            include_links=True,
            output_format="markdown",
            favor_recall=True,
        )

        pages.append({
            "url": url,
            "title": title,
            "content": content or "",
            "links": [],
        })

        for a in soup.select("a[href]"):
            link = urljoin(url, a["href"]).split("#")[0]
            parsed = urlparse(link)

            if parsed.netloc == DOMAIN and parsed.path.startswith(BASE_PATH):
                pages[-1]["links"].append({
                    "text": a.get_text(" ", strip=True),
                    "url": link,
                })

                if link not in visited:
                    queue.append(link)

        print(f"Extrait : {title} | {url}")
        time.sleep(1)

    except Exception as e:
        print(f"Erreur : {url} - {e}")

with open("contenu_site.json", "w", encoding="utf-8") as f:
    json.dump(pages, f, ensure_ascii=False, indent=2)

with open("contenu_site.md", "w", encoding="utf-8") as f:
    for page in pages:
        f.write(f"\n# {page['title']}\n")
        f.write(f"Source : {page['url']}\n\n")
        f.write(page["content"] + "\n\n")
        f.write("---\n")

print(f"\nTermine : {len(pages)} pages extraites.")
print("Fichiers : contenu_site.json , contenu_site.md")
