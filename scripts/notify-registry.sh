#!/usr/bin/env bash
set -euo pipefail

# Notify the pikkufabric registries that a package was published to npm. Fabric
# fetches the published tarball, stores it in R2, and indexes it (the
# `ingestPackage` endpoint). REGISTRY_API_KEY is a fabric API token — it's
# resolved (sha256 -> apiToken table) to the publishing org/user, who the
# ingested package is then attributed to.
#
# The package is ingested into every target from registry-targets.sh (staging
# and production by default). Targets are independent: one being down must not
# stop the others from being told, so all are attempted and failures are
# reported together at the end.

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=scripts/registry-targets.sh
source "$SCRIPT_DIR/registry-targets.sh"

if [ -z "${REGISTRY_API_KEY:-}" ]; then
  echo "Error: REGISTRY_API_KEY environment variable is required"
  exit 1
fi

if [ -z "${1:-}" ]; then
  echo "Usage: notify-registry.sh <package-name> [version]"
  exit 1
fi

name="$1"
version="${2:-}"

# Omit version when not provided — fabric resolves the `latest` dist-tag.
if [ -n "$version" ]; then
  payload="{\"packageName\":\"$name\",\"version\":\"$version\"}"
else
  payload="{\"packageName\":\"$name\"}"
fi

# npm propagation lags after publish: fabric's ingest fetches the package doc
# from registry.npmjs.org, which 404s until npm's read path catches up. That's
# usually seconds, but the first package of a batch has repeatedly needed ~20s+
# (a 3x10s budget once ran out one attempt short and stranded a package). Back
# off exponentially (15/30/60/120/240s, ~8min total) instead — only the first
# package of a run normally pays it: npm has caught up by the time the rest
# are notified.
MAX_RETRIES="${NOTIFY_MAX_RETRIES:-6}"

# Ingest into one registry, retrying the npm-lag window. Echoes progress; returns
# non-zero once the retry budget is spent.
ingest_into() {
  local url="$1"
  local delay="${NOTIFY_RETRY_DELAY:-15}"
  local attempt response status body

  for attempt in $(seq 1 "$MAX_RETRIES"); do
    echo -n "Ingesting $name${version:+@$version} into $url (attempt $attempt/$MAX_RETRIES)... "
    # Bound the request. Without --max-time a stalled ingest hangs this curl —
    # and with it the whole release job — for as long as the server holds the
    # socket, with no retry and no error. A bounded request turns a stall into
    # an ordinary failed attempt the backoff below can retry.
    response=$(curl -s -w "\n%{http_code}" \
      --connect-timeout "${NOTIFY_CONNECT_TIMEOUT:-15}" \
      --max-time "${NOTIFY_MAX_TIME:-180}" \
      -X POST "$url/registry/addons/ingest" \
      -H "Content-Type: application/json" \
      -H "Authorization: Bearer $REGISTRY_API_KEY" \
      -d "$payload")

    status=$(echo "$response" | tail -n1)
    # `head -n -1` is GNU-only — BSD/macOS head rejects a negative count, which
    # aborts the script before the status is ever checked. Strip the trailing
    # status line with parameter expansion so this runs anywhere.
    body="${response%$'\n'*}"

    if [ "$status" -ge 200 ] && [ "$status" -lt 300 ]; then
      echo "ok ($status)"
      return 0
    fi

    echo "FAILED ($status)"
    echo "  Response: $body"

    if [ "$attempt" -lt "$MAX_RETRIES" ]; then
      echo "  Retrying in ${delay}s..."
      sleep "$delay"
      delay=$((delay * 2))
    fi
  done

  return 1
}

failed=()
while IFS= read -r url; do
  [ -n "$url" ] || continue
  if ! ingest_into "$url"; then
    failed+=("$url")
  fi
done < <(registry_targets)

if [ ${#failed[@]} -gt 0 ]; then
  echo "  $name${version:+@$version} was not ingested into: ${failed[*]}" >&2
  exit 1
fi

exit 0
