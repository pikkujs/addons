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
#   REGISTRY_API_KEY=… bash scripts/backfill-registry.sh --reconcile
#   REGISTRY_API_KEY=… bash scripts/backfill-registry.sh --all
#
# A package given without @version resolves to npm's `latest` dist-tag.
#
# `--reconcile` (preferred) asks the registry what it already has, diffs that
# against the versions in packages/, and ingests only what is missing or stale.
# It is idempotent and cheap, so it is safe to run on every release as a
# self-heal for anything an earlier notify step dropped.
#
# `--all` re-ingests every package unconditionally — a bigger hammer, useful
# only if the registry's stored metadata itself needs rebuilding.
#
# Both modes read versions from the local checkout, so `git pull` first: a stale
# checkout asks for versions that were never published, npm 404s, and the ingest
# reports them as failures.
#
# Every registry in registry-targets.sh (staging and production) is reconciled,
# each against its own catalogue. Pin a single one with REGISTRY_URL=…

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"

if [ -z "${REGISTRY_API_KEY:-}" ]; then
  echo "Error: REGISTRY_API_KEY environment variable is required" >&2
  exit 1
fi

if [ $# -eq 0 ]; then
  echo "Usage: backfill-registry.sh <pkg[@version]>... | --reconcile | --all" >&2
  exit 1
fi

# shellcheck source=scripts/registry-targets.sh
source "$SCRIPT_DIR/registry-targets.sh"

# Every publishable package in the checkout, as `name@version`.
local_packages() {
  while IFS= read -r pkg_json; do
    node -e "
      const p = require('$ROOT_DIR/' + process.argv[1]);
      if (p.private || !p.name || p.name.startsWith('@pikku/test-')) process.exit(0);
      console.log(p.name + '@' + p.version);
    " "$pkg_json"
  done < <(cd "$ROOT_DIR" && find packages -maxdepth 3 -name package.json \
    -not -path '*/test/*' -not -path '*/node_modules/*' | sort)
}

specs=()

# `mapfile` is bash 4+; macOS still ships bash 3.2, where it is missing and the
# array would silently stay empty — which reads as "nothing to do" rather than
# as an error. Read the lines explicitly so both platforms behave the same.
read_specs() {
  specs=()
  local line
  while IFS= read -r line; do
    [ -n "$line" ] && specs+=("$line")
  done <<< "$1"
}

# Ingest the resolved specs into ONE registry. Each environment is reconciled
# against its own catalogue — staging and prod are routinely at different states
# (a fresh prod reset, a staging that has never been ingested), so a single
# shared diff would skip whatever one of them is missing.
backfill_target() {
  local url="$1"

  case "$mode" in
    --reconcile)
      # Ask this registry what it already has and ingest only the difference.
      if ! diff_out=$(local_packages | REGISTRY_URL="$url" node "$SCRIPT_DIR/registry-diff.mjs"); then
        echo "Error: could not diff the checkout against $url" >&2
        return 1
      fi
      read_specs "$diff_out"

      if [ ${#specs[@]} -eq 0 ]; then
        echo "$url is already in sync with the checkout — nothing to do."
        return 0
      fi
      ;;
    --all)
      if ! all_out=$(local_packages); then
        echo "Error: could not enumerate local packages" >&2
        return 1
      fi
      read_specs "$all_out"
      ;;
    *)
      specs=("${explicit_specs[@]}")
      ;;
  esac

  echo "Backfilling ${#specs[@]} package(s) into $url..."
  echo

  local failed=()
  local spec name version
  for spec in "${specs[@]}"; do
    # Split a trailing @version off, taking care not to eat the leading @scope.
    if [[ "$spec" =~ ^(@?[^@]+)@(.+)$ ]]; then
      name="${BASH_REMATCH[1]}"
      version="${BASH_REMATCH[2]}"
    else
      name="$spec"
      version=""
    fi

    if ! REGISTRY_URL="$url" bash "$SCRIPT_DIR/notify-registry.sh" "$name" "$version"; then
      failed+=("$spec")
    fi
  done

  echo
  if [ ${#failed[@]} -gt 0 ]; then
    echo "${#failed[@]} of ${#specs[@]} failed for $url:" >&2
    printf '  - %s\n' "${failed[@]}" >&2
    return 1
  fi

  echo "All ${#specs[@]} package(s) ingested into $url ✓"
  return 0
}

case "$1" in
  --reconcile | --all)
    mode="$1"
    explicit_specs=()
    ;;
  *)
    mode='explicit'
    explicit_specs=("$@")
    ;;
esac

# Every target is attempted even if an earlier one fails: a staging outage must
# not leave production un-ingested (or the reverse).
failed_targets=()
while IFS= read -r target; do
  [ -n "$target" ] || continue
  echo "── $target ─────────────────────────────────────────"
  backfill_target "$target" || failed_targets+=("$target")
  echo
done < <(registry_targets)

if [ ${#failed_targets[@]} -gt 0 ]; then
  echo "Backfill failed for: ${failed_targets[*]}" >&2
  exit 1
fi
