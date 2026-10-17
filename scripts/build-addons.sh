#!/usr/bin/env bash
# Codegen and type-check addons in parallel, one per CPU core.
#
# Usage:
#   scripts/build-addons.sh --changed        # addons with a pending changeset (what CI runs)
#   scripts/build-addons.sh --all            # every addon
#   scripts/build-addons.sh <addon-dir>...   # e.g. packages/payments/stripe
#
# JOBS overrides the parallelism (default: number of cores). Every addon is
# built even after a failure; the failures are listed at the end and the
# script exits non-zero if there were any.
set -uo pipefail
cd "$(dirname "$0")/.."

all_addons() {
  find packages -mindepth 3 -maxdepth 3 -name package.json -not -path '*/node_modules/*' \
    | xargs -n1 dirname | sort
}

changed_addons() {
  local status
  status=$(mktemp)
  npx changeset status --output "$status" >/dev/null 2>&1 || true
  node -e '
    const fs = require("fs")
    const [status, ...dirs] = process.argv.slice(1)
    const raw = fs.readFileSync(status, "utf8")
    if (!raw.trim()) process.exit(0)
    const names = new Set(JSON.parse(raw).releases.map((r) => r.name))
    for (const dir of dirs) {
      const pkg = JSON.parse(fs.readFileSync(`${dir}/package.json`, "utf8"))
      if (names.has(pkg.name)) console.log(dir)
    }
  ' "$status" $(all_addons)
  rm -f "$status"
}

case "${1:-}" in
  --changed) addons=$(changed_addons) ;;
  --all) addons=$(all_addons) ;;
  '') echo "usage: $0 --changed | --all | <addon-dir>..." >&2; exit 2 ;;
  *) addons=$(printf '%s\n' "$@") ;;
esac

if [ -z "$addons" ]; then
  echo "No addons to build."
  exit 0
fi

JOBS=${JOBS:-$(nproc 2>/dev/null || sysctl -n hw.ncpu)}
LOGS=$(mktemp -d)
total=$(echo "$addons" | wc -l | tr -d ' ')
echo "Building $total addon(s), $JOBS at a time"

build_one() {
  local dir=$1 log="$LOGS/$(echo "$1" | tr / _)"
  local start=$SECONDS
  if (cd "$dir" && npx pikku all && npx tsc --noEmit) >"$log.log" 2>&1; then
    echo "$((SECONDS - start))" >"$log.ok"
    echo "✓ $dir"
  else
    echo "$((SECONDS - start))" >"$log.fail"
    echo "✗ $dir"
  fi
}
export -f build_one
export LOGS

echo "$addons" | xargs -P "$JOBS" -I{} bash -c 'build_one "$1"' _ {}

# Full output per addon, collapsed into a group in the Actions log.
failed=()
while IFS= read -r dir; do
  log="$LOGS/$(echo "$dir" | tr / _)"
  if [ -f "$log.ok" ]; then
    echo "::group::✓ $dir ($(cat "$log.ok")s)"
  else
    echo "::group::✗ $dir ($(cat "$log.fail" 2>/dev/null || echo ?)s)"
    failed+=("$dir")
  fi
  cat "$log.log" 2>/dev/null
  echo "::endgroup::"
done <<<"$addons"
rm -rf "$LOGS"

if [ ${#failed[@]} -gt 0 ]; then
  echo "::error::${#failed[@]} of $total addon(s) failed to build:"
  printf '  - %s\n' "${failed[@]}"
  exit 1
fi
echo "All $total addon(s) built ✓"
