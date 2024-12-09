#!/usr/bin/env python3

import argparse
import json
import subprocess
import sys
from pathlib import Path


def get_main_package_version():
    result = subprocess.run(
        ["hatch", "version"],
        capture_output=True,
        text=True,
        check=True,
    )
    return result.stdout.strip()


def update_npm_packages(version):
    subprocess.run(
        [
            "npx",
            "lerna",
            "version",
            version,
            "--force-publish",
            "--no-push",
            "--no-git-tag-version",
            "--yes",  # Skip confirmation prompt
        ],
        check=True,
    )
    print(f"Updated npm packages to version {version}")


def main():
    parser = argparse.ArgumentParser(description="Bump package versions")
    parser.add_argument(
        "version",
        help=(
            'Version specifier: "major", "minor", "patch", "next" (equivalent to "build"), '
            'or a specific version number (e.g. "1.2.3")'
        ),
    )
    args = parser.parse_args()

    version = args.version.lower()

    if version == "next":
        version = "build"

    subprocess.run(["hatch", "version", version], check=True)

    version = get_main_package_version()
    print(f"Main package version bumped to: {version}")

    update_npm_packages(version)


if __name__ == "__main__":
    main()
