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

# npm propagation can lag a few seconds after publish — retry up to 3 times
# with a short back-off before giving up.
MAX_RETRIES=3
RETRY_DELAY=10

for attempt in $(seq 1 $MAX_RETRIES); do
  echo -n "Ingesting $name${version:+@$version} (attempt $attempt/$MAX_RETRIES)... "
  response=$(curl -s -w "\n%{http_code}" \
    -X POST "$REGISTRY_URL/registry/addons/ingest" \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $REGISTRY_API_KEY" \
    -d "$payload")

  status=$(echo "$response" | tail -n1)
  body=$(echo "$response" | head -n -1)

  if [ "$status" -ge 200 ] && [ "$status" -lt 300 ]; then
    echo "ok ($status)"
    exit 0
  fi

  echo "FAILED ($status)"
  echo "  Response: $body"

  if [ "$attempt" -lt "$MAX_RETRIES" ]; then
    echo "  Retrying in ${RETRY_DELAY}s..."
    sleep $RETRY_DELAY
  fi
done

exit 1
