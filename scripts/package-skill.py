"""Build one downloadable ZIP per skill, or check each ZIP against its source."""
import argparse
from pathlib import Path
from zipfile import BadZipFile, ZipFile, ZipInfo

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument("--check", action="store_true")
args = parser.parse_args()

root = Path(__file__).resolve().parents[1]
skills = root / "skills"
assets = root / "assets"
expected = set()

for instructions in sorted(skills.glob("*/SKILL.md")):
    folder = instructions.parent
    archive = assets / f"{folder.name}-skill.zip"
    expected.add(archive)
    files = {
        path.relative_to(skills).as_posix(): path.read_bytes()
        for path in sorted(folder.rglob("*")) if path.is_file()
    }
    if args.check:
        try:
            with ZipFile(archive) as bundle:
                matches = sorted(bundle.namelist()) == sorted(files) and all(
                    bundle.read(name) == content for name, content in files.items()
                )
        except (FileNotFoundError, BadZipFile):
            matches = False
        if not matches:
            raise SystemExit(f"Rebuild {archive.name} with python3 scripts/package-skill.py.")
    else:
        with ZipFile(archive, "w") as bundle:
            for name, content in files.items():
                # Identical skill files produce identical archives on every platform.
                entry = ZipInfo(name)
                entry.create_system = 3
                entry.external_attr = 0o100644 << 16
                bundle.writestr(entry, content)

if not expected:
    raise SystemExit("No skills found. Each skill needs its own folder and SKILL.md.")
if args.check:
    for archive in sorted(set(assets.glob("*-skill.zip")) - expected):
        raise SystemExit(f"No matching skill in skills/ for {archive.name}.")
