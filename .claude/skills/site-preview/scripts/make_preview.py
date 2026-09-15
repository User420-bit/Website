#!/usr/bin/env python3
"""
Turn a built static site into a portable, publishable preview.

Two jobs, both fiddly enough to be worth doing once properly:

1. Make the build portable. A built site almost always references its assets
   from the site root ("/assets/app.css", or "/Website/assets/app.css" when a
   base path is set). Those only resolve if something serves the directory at
   that root. Rewriting them to paths relative to each page's own depth makes
   the whole tree work from anywhere, including as Artifact files.

2. Enumerate the routes, so the viewer can offer a real navigation rail rather
   than making the reviewer guess at URLs.

The output is a directory holding `viewer.html` (the Artifact's main page) and
`site/` (the portable build, published alongside as supporting files).

No third-party dependencies: this runs in repos that have no Node toolchain,
and the point is to not add one.
"""

import argparse
import html as htmllib
import json
import re
import shutil
import sys
from pathlib import Path

# Rewritten in place. CSS counts because url() inside a stylesheet resolves
# against the stylesheet, so it needs its own depth prefix.
REWRITE_SUFFIXES = {".html", ".htm", ".css"}

# Not rewritten, but flagged: a path baked into JS usually means client-side
# routing or runtime fetches, which a file-served preview cannot satisfy.
WARN_SUFFIXES = {".js", ".mjs", ".cjs", ".json"}

# Metadata pointing at files a preview does not carry. Dead, and dead links
# are exactly what a reviewer should not be distracted by.
DROP_TAGS = re.compile(
    r'<link[^>]+rel=["\'](?:sitemap|manifest)["\'][^>]*>', re.IGNORECASE
)

# A root-relative URL always begins right after one of these. Anchoring on
# them is what keeps "https://example.com/base/" (canonical tags, og:url)
# untouched while still catching every entry in a srcset list.
DELIMITERS = "\"'( ,\t\n"

UI = {
    "en": {
        "open": "open in its own tab",
        "full": "Full",
        "width": "Width",
        "theme": "Theme",
        "root": "Root",
        "frame_title": "Preview",
        "auto": "auto",
        "light": "light",
        "dark": "dark",
        "foot": (
            "Real build output, not a reconstruction. Links inside the page work in "
            "the frame. Width resizes the frame, so media queries respond \u2014 but user "
            "agent, device pixel ratio and touch behaviour do not."
        ),
    },
    "de": {
        "open": "in eigenem Tab öffnen",
        "full": "Voll",
        "width": "Breite",
        "theme": "Thema",
        "root": "Start",
        "frame_title": "Vorschau",
        "auto": "auto",
        "light": "hell",
        "dark": "dunkel",
        "foot": (
            "Echtes Build-Ergebnis, nicht nachgebaut. Die Links in der Seite funktionieren "
            "im Rahmen. Die Breite ver\u00e4ndert den Rahmen, Media Queries reagieren also \u2014 "
            "User-Agent, DPR und Touch-Verhalten aber nicht."
        ),
    },
}


# --------------------------------------------------------------------------
# Portability
# --------------------------------------------------------------------------


def rewrite(text: str, base: str, prefix: str) -> tuple[str, int]:
    """Replace root-relative `base` URLs with ones relative to this file.

    `prefix` is "" for a file at the tree root, "../" one level down, and so
    on. Directory URLs get "index.html" appended, because nothing resolves a
    directory index when the files are served as plain objects.
    """
    out: list[str] = []
    i = 0
    hits = 0

    while True:
        j = text.find(base, i)
        if j < 0:
            out.append(text[i:])
            break

        prev = text[j - 1] if j else ""
        looks_absolute = re.search(r'https?://[^\s"\'<>()]*$', text[max(0, j - 200) : j])

        if (j and prev not in DELIMITERS) or looks_absolute:
            out.append(text[i : j + len(base)])
            i = j + len(base)
            continue

        tail = re.match(r'[^"\'\s>)]*', text[j + len(base) :]).group(0)
        end = j + len(base) + len(tail)
        if tail == "" or tail.endswith("/"):
            tail += "index.html"

        out.append(text[i:j])
        out.append(prefix + tail if (prefix or tail) else "./")
        i = end
        hits += 1

    return "".join(out), hits


def make_portable(dist: Path, site: Path, base: str) -> tuple[int, list[str]]:
    if site.exists():
        shutil.rmtree(site)
    shutil.copytree(dist, site)

    # Globbed, not listed: generators name these sitemap-0.xml, sitemap.xml,
    # sitemap-index.xml and more. A stray one is dead weight in the preview.
    for junk in [*site.glob("sitemap*.xml"), site / "robots.txt"]:
        junk.unlink(missing_ok=True)

    total = 0
    warnings: list[str] = []

    for path in sorted(site.rglob("*")):
        if not path.is_file():
            continue
        rel = path.relative_to(site)

        if path.suffix.lower() in WARN_SUFFIXES:
            try:
                if base in path.read_text(encoding="utf-8", errors="ignore"):
                    warnings.append(
                        f"{rel}: enthält '{base}' — Pfad in JS/JSON gebacken. "
                        "Client-Routing oder Runtime-Fetch läuft in der Vorschau nicht."
                    )
            except OSError:
                pass
            continue

        if path.suffix.lower() not in REWRITE_SUFFIXES:
            continue

        text = path.read_text(encoding="utf-8")
        if path.suffix.lower() in {".html", ".htm"}:
            text = DROP_TAGS.sub("", text)

        prefix = "../" * (len(rel.parts) - 1)
        text, hits = rewrite(text, base, prefix)
        total += hits
        path.write_text(text, encoding="utf-8")

    return total, warnings


# --------------------------------------------------------------------------
# Routes
# --------------------------------------------------------------------------


def strip_tags(fragment: str) -> str:
    return htmllib.unescape(re.sub(r"<[^>]+>", "", fragment)).strip()


def label_for(text: str, rel: Path) -> tuple[str, bool]:
    """Prefer the H1 — it is what a reviewer is checking. Report if missing."""
    h1 = re.search(r"<h1[^>]*>(.*?)</h1>", text, re.IGNORECASE | re.DOTALL)
    if h1:
        label = strip_tags(h1.group(1))
        if label:
            return (label[:60], True)

    title = re.search(r"<title[^>]*>(.*?)</title>", text, re.IGNORECASE | re.DOTALL)
    if title:
        label = strip_tags(title.group(1))
        if label:
            return (label.split("–")[0].split("|")[0].strip()[:60], False)

    return (rel.as_posix(), False)


def derive_routes(site: Path, base: str, root_label: str) -> list[dict]:
    groups: dict[str, list[dict]] = {}

    for path in sorted(site.rglob("*.html")):
        rel = path.relative_to(site)
        parts = rel.parts
        text = path.read_text(encoding="utf-8", errors="ignore")
        label, has_h1 = label_for(text, rel)

        # A page is "top level" when it sits at the root or is the index of a
        # single directory below it. Anything deeper groups under its section,
        # which is how a reader already thinks about the site.
        top = len(parts) == 1 or (len(parts) == 2 and parts[-1] == "index.html")
        group = root_label if top else parts[0]

        url = "/" + rel.as_posix().replace("index.html", "")
        groups.setdefault(group, []).append(
            {
                "label": label,
                "src": f"site/{rel.as_posix()}",
                "path": url,
                "h1": has_h1,
            }
        )

    def order(item: dict) -> tuple[int, str]:
        # The entry page first; it is what the preview opens on.
        return (0 if item["src"] == "site/index.html" else 1, item["label"].lower())

    ordered = []
    for name in sorted(groups, key=lambda g: (g != root_label, g)):
        ordered.append({"group": name, "items": sorted(groups[name], key=order)})
    return ordered


# --------------------------------------------------------------------------
# Viewer
# --------------------------------------------------------------------------


def parse_check(raw: str) -> dict:
    """`label|value|state` — state is ok, warn or fail. Default ok."""
    bits = [b.strip() for b in raw.split("|")]
    label = bits[0]
    value = bits[1] if len(bits) > 1 else ""
    state = bits[2] if len(bits) > 2 and bits[2] in {"ok", "warn", "fail"} else "ok"
    return {"label": label, "value": value, "state": state}


def build_viewer(template: Path, out: Path, ctx: dict) -> None:
    text = template.read_text(encoding="utf-8")
    for token, value in ctx.items():
        text = text.replace(token, value)
    out.write_text(text, encoding="utf-8")


# --------------------------------------------------------------------------


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--dist", required=True, help="Built output directory, e.g. dist")
    ap.add_argument(
        "--base",
        default="/",
        help="Base path the site was built for, e.g. /Website/ (default: /)",
    )
    ap.add_argument("--out", default=".preview", help="Where to write the preview")
    ap.add_argument("--title", required=True, help="Artifact <title>: a real name")
    ap.add_argument("--subtitle", default="", help="One line under the title")
    ap.add_argument("--meta", default="", help="Right-hand build facts, e.g. commit")
    ap.add_argument(
        "--check",
        action="append",
        default=[],
        metavar="LABEL|VALUE|STATE",
        help="A check you actually ran. Repeatable. STATE: ok|warn|fail",
    )
    ap.add_argument("--lang", choices=sorted(UI), default="en")
    ap.add_argument("--root-label", default=None, help="Name of the top-level group")
    ap.add_argument("--routes", help="Curated routes.json to use instead of deriving")
    ap.add_argument(
        "--widths",
        default="390,768,1280",
        help="Preset widths in px, comma separated (default: 390,768,1280)",
    )
    args = ap.parse_args()

    dist = Path(args.dist)
    if not dist.is_dir():
        print(f"FEHLER: {dist} ist kein Verzeichnis. Erst bauen.", file=sys.stderr)
        return 1

    base = args.base if args.base.endswith("/") else args.base + "/"
    strings = UI[args.lang]
    root_label = args.root_label or strings["root"]

    out = Path(args.out)
    out.mkdir(parents=True, exist_ok=True)
    site = out / "site"

    rewritten, warnings = make_portable(dist, site, base)

    if args.routes:
        routes = json.loads(Path(args.routes).read_text(encoding="utf-8"))
    else:
        routes = derive_routes(site, base, root_label)
    (out / "routes.json").write_text(
        json.dumps(routes, ensure_ascii=False, indent=2), encoding="utf-8"
    )

    pages = sum(len(g["items"]) for g in routes)
    missing_h1 = [i["path"] for g in routes for i in g["items"] if not i["h1"]]

    template = Path(__file__).resolve().parent.parent / "assets" / "viewer.template.html"
    build_viewer(
        template,
        out / "viewer.html",
        {
            "__TITLE__": htmllib.escape(args.title),
            "__SUBTITLE__": htmllib.escape(args.subtitle),
            "__META__": htmllib.escape(
                f"{args.meta} · {base}".strip(" ·") if base != "/" else args.meta
            ),
            "/*__ROUTES__*/ []": json.dumps(routes, ensure_ascii=False),
            "/*__CHECKS__*/ []": json.dumps(
                [parse_check(c) for c in args.check], ensure_ascii=False
            ),
            "/*__WIDTHS__*/ []": json.dumps(
                [int(w) for w in args.widths.split(",") if w.strip().isdigit()]
            ),
            "/*__STRINGS__*/ {}": json.dumps(strings, ensure_ascii=False),
        },
    )

    print(f"Vorschau in {out}/")
    print(f"  {pages} Seiten, {rewritten} Pfade auf relativ umgeschrieben")
    print(f"  Basis-Pfad: {base}")
    if missing_h1:
        print(f"  ohne H1 ({len(missing_h1)}): {', '.join(missing_h1[:6])}")
    for w in warnings:
        print(f"  WARNUNG: {w}")

    files = {
        f"site/{p.relative_to(site).as_posix()}": str(p)
        for p in sorted(site.rglob("*"))
        if p.is_file()
    }
    (out / "files.json").write_text(
        json.dumps(files, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    print(f"  {len(files)} Dateien, Publish-Map in {out}/files.json")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
