#!/usr/bin/env bash
# Run a command in each addon, in parallel, one addon per CPU core.
#
# Usage:
#   scripts/foreach-addon.sh --changed -- <command...>   # addons with a pending changeset
#   scripts/foreach-addon.sh --all -- <command...>       # every addon
#   scripts/foreach-addon.sh <addon-dir>... -- <command...>
#
# e.g. scripts/foreach-addon.sh --changed -- sh -c 'npx pikku all && npx tsc --noEmit'
#
# The command runs inside each addon's directory. JOBS overrides the
# parallelism (default: number of cores); `bun run --filter` has no such limit
# and starting every addon at once exhausts the CI runner. Every addon runs
# even after a failure; each one's output is grouped in the Actions log, the
# failures are listed at the end, and the script exits non-zero if any failed.
set -uo pipefail
cd "$(dirname "$0")/.."

usage() {
  echo "usage: $0 --changed | --all | <addon-dir>... -- <command...>" >&2
  exit 2
}

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

selection=()
while [ $# -gt 0 ] && [ "$1" != "--" ]; do
  selection+=("$1")
  shift
done
[ $# -gt 1 ] || usage
shift
[ ${#selection[@]} -gt 0 ] || usage

case "${selection[0]}" in
  --changed) addons=$(changed_addons) ;;
  --all) addons=$(all_addons) ;;
  *) addons=$(printf '%s\n' "${selection[@]}") ;;
esac

if [ -z "$addons" ]; then
  echo "No addons selected."
  exit 0
fi

JOBS=${JOBS:-$(nproc 2>/dev/null || sysctl -n hw.ncpu)}
LOGS=$(mktemp -d)
CMD=$(printf '%q ' "$@")
total=$(echo "$addons" | wc -l | tr -d ' ')
echo "Running '$*' in $total addon(s), $JOBS at a time"

run_one() {
  local dir=$1 log="$LOGS/$(echo "$1" | tr / _)"
  local start=$SECONDS
  if (cd "$dir" && eval "$CMD") >"$log.log" 2>&1; then
    echo "$((SECONDS - start))" >"$log.ok"
    echo "✓ $dir"
  else
    echo "$((SECONDS - start))" >"$log.fail"
    echo "✗ $dir"
  fi
}
export -f run_one
export LOGS CMD

echo "$addons" | xargs -P "$JOBS" -I{} bash -c 'run_one "$1"' _ {}

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
  echo "::error::${#failed[@]} of $total addon(s) failed:"
  printf '  - %s\n' "${failed[@]}"
  exit 1
fi
echo "All $total addon(s) passed ✓"
