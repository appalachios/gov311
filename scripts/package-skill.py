"""Build the downloadable skill ZIP or check that its contents match the source."""
import argparse
from pathlib import Path
from zipfile import ZipFile, ZipInfo

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument("--check", action="store_true")
args = parser.parse_args()

root = Path(__file__).resolve().parents[1]
skills = root / "skills"
archive = root / "assets" / "gov311-skill.zip"
files = {
    path.relative_to(skills).as_posix(): path.read_bytes()
    for path in sorted((skills / "gov311").rglob("*")) if path.is_file()
}

if args.check:
    with ZipFile(archive) as bundle:
        if sorted(bundle.namelist()) != sorted(files) or any(
            bundle.read(name) != content for name, content in files.items()
        ):
            raise SystemExit("The skill ZIP is out of date. Run python3 scripts/package-skill.py.")
else:
    with ZipFile(archive, "w") as bundle:
        for name, content in files.items():
            # Use fixed timestamps and permissions so identical inputs produce identical ZIPs.
            entry = ZipInfo(name)
            entry.create_system = 3
            entry.external_attr = 0o100644 << 16
            bundle.writestr(entry, content)
