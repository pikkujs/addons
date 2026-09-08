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
# `--reconcile` additionally skips any package whose name npm has never served —
# a package added here but not yet released is not a registry gap. `--all` and an
# explicit package list do not skip: naming a package is asking for it.
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

# A package whose NAME has never existed on npm is not a registry gap: it is a
# package this repo has added but not yet released. `--reconcile` exists to make
# the registry match what npm actually serves, so those are skipped rather than
# retried — notify-registry.sh spends ~8 minutes of backoff per package riding
# out propagation lag, and no amount of waiting publishes something for the
# first time. Left in, one unreleased package fails the scheduled reconcile
# every day for as long as it stays unreleased (@pikku/addon-stripe-commerce did
# exactly that from 2026-09-02, ~16 minutes a night, and the red run then hides
# whatever else breaks).
#
# This is deliberately about the NAME, not the version. A name npm has never
# heard of cannot be lag. A known name at an unpublished version IS the lag case
# the retry budget is for, and still gets it.
never_published() {
  local name="$1" out
  out=$(npm view "$name" version 2>&1) && return 1
  case "$out" in
    *E404*|*'is not in this registry'*|*'404 Not Found'*) return 0 ;;
    *) return 1 ;;
  esac
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

      local kept=() unreleased=() spec_name
      for spec_name in "${specs[@]}"; do
        if never_published "${spec_name%@*}"; then
          unreleased+=("${spec_name%@*}")
        else
          kept+=("$spec_name")
        fi
      done
      if [ ${#unreleased[@]} -gt 0 ]; then
        echo "Skipping ${#unreleased[@]} package(s) never published to npm:"
        printf '  - %s\n' "${unreleased[@]}"
        echo "  Release them and the next reconcile picks them up."
        echo
      fi
      specs=("${kept[@]+"${kept[@]}"}")

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

  # Circuit breaker. notify-registry.sh spends a ~8 minute retry budget per
  # package to ride out npm propagation lag, which is right for the one or two
  # packages of a release but catastrophic in bulk: on 2026-08-21 a systematic
  # rejection turned a 217-package reconcile into a 28-hour job that pinned the
  # release workflow's concurrency slot and blocked the publish behind it.
  #
  # Nothing here can distinguish "npm is lagging" from "this target rejects
  # everything", but the shape differs: lag clears within the first package's
  # budget, a broken target fails every one. So give the budget to the first few
  # and bail if not a single package has landed by then — the operator wants to
  # know the target is broken, not to watch it fail 217 times.
  local breaker="${BACKFILL_INITIAL_FAILURE_LIMIT:-3}"

  local failed=()
  local ok_count=0
  local spec name version
  for spec in "${specs[@]}"; do
    if [ "$breaker" -gt 0 ] && [ "$ok_count" -eq 0 ] && [ "${#failed[@]}" -ge "$breaker" ]; then
      echo
      echo "Aborting $url: the first ${#failed[@]} package(s) all failed and none succeeded." >&2
      echo "That is a broken target, not npm lag — fix it and re-run the reconcile." >&2
      echo "Set BACKFILL_INITIAL_FAILURE_LIMIT=0 to disable this check." >&2
      return 1
    fi
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
    else
      ok_count=$((ok_count + 1))
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
