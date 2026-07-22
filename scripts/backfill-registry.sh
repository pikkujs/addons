#!/usr/bin/env bash
set -uo pipefail

# Re-notify the pikkufabric registry for packages that are already published to
# npm but never got ingested — e.g. when the release workflow's notify step
# failed (npm propagation lag) after `changeset publish` had already succeeded.
# Republishing isn't an option at that point (the version exists on npm), so
# this repairs the registry side out of band.
#
# Usage:
#   REGISTRY_API_KEY=… bash scripts/backfill-registry.sh @pikku/addon-stripe@0.1.4 …
#   REGISTRY_API_KEY=… bash scripts/backfill-registry.sh @pikku/addon-stripe
#   REGISTRY_API_KEY=… bash scripts/backfill-registry.sh --all
#
# A package given without @version resolves to npm's `latest` dist-tag. `--all`
# reads every publishable package in packages/ and ingests its local version —
# so `git pull` first, or a stale checkout will ask for versions that were never
# published (the ingest 500s on npm's 404 and the run reports them as failures).

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"

if [ -z "${REGISTRY_API_KEY:-}" ]; then
  echo "Error: REGISTRY_API_KEY environment variable is required" >&2
  exit 1
fi

if [ $# -eq 0 ]; then
  echo "Usage: backfill-registry.sh <pkg[@version]>... | --all" >&2
  exit 1
fi

specs=()

if [ "$1" = "--all" ]; then
  # Every non-test package under packages/, at its current local version.
  while IFS= read -r pkg_json; do
    entry=$(node -e "
      const p = require('$ROOT_DIR/' + process.argv[1]);
      if (p.private || !p.name || p.name.startsWith('@pikku/test-')) process.exit(0);
      console.log(p.name + '@' + p.version);
    " "$pkg_json")
    [ -n "$entry" ] && specs+=("$entry")
  done < <(cd "$ROOT_DIR" && find packages -maxdepth 3 -name package.json \
    -not -path '*/test/*' -not -path '*/node_modules/*' | sort)
else
  specs=("$@")
fi

echo "Backfilling ${#specs[@]} package(s)..."
echo

failed=()
for spec in "${specs[@]}"; do
  # Split a trailing @version off, taking care not to eat the leading @scope.
  if [[ "$spec" =~ ^(@?[^@]+)@(.+)$ ]]; then
    name="${BASH_REMATCH[1]}"
    version="${BASH_REMATCH[2]}"
  else
    name="$spec"
    version=""
  fi

  if ! bash "$SCRIPT_DIR/notify-registry.sh" "$name" "$version"; then
    failed+=("$spec")
  fi
done

echo
if [ ${#failed[@]} -gt 0 ]; then
  echo "${#failed[@]} of ${#specs[@]} failed:" >&2
  printf '  - %s\n' "${failed[@]}" >&2
  exit 1
fi

echo "All ${#specs[@]} package(s) ingested ✓"
