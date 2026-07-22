#!/usr/bin/env bash
set -euo pipefail

# Notify the pikkufabric registry that a package was published to npm. Fabric
# fetches the published tarball, stores it in R2, and indexes it (the
# `ingestPackage` endpoint). REGISTRY_API_KEY is a fabric API token — it's
# resolved (sha256 -> apiToken table) to the publishing org/user, who the
# ingested package is then attributed to.

if [ -z "${REGISTRY_API_KEY:-}" ]; then
  echo "Error: REGISTRY_API_KEY environment variable is required"
  exit 1
fi

if [ -z "${1:-}" ]; then
  echo "Usage: notify-registry.sh <package-name> [version]"
  exit 1
fi

REGISTRY_URL="${REGISTRY_URL:-https://api.pikkufabric.com}"
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
RETRY_DELAY="${NOTIFY_RETRY_DELAY:-15}"

for attempt in $(seq 1 "$MAX_RETRIES"); do
  echo -n "Ingesting $name${version:+@$version} (attempt $attempt/$MAX_RETRIES)... "
  response=$(curl -s -w "\n%{http_code}" \
    -X POST "$REGISTRY_URL/registry/addons/ingest" \
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
    exit 0
  fi

  echo "FAILED ($status)"
  echo "  Response: $body"

  if [ "$attempt" -lt "$MAX_RETRIES" ]; then
    echo "  Retrying in ${RETRY_DELAY}s..."
    sleep "$RETRY_DELAY"
    RETRY_DELAY=$((RETRY_DELAY * 2))
  fi
done

exit 1
