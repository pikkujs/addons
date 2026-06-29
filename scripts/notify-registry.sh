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

echo -n "Ingesting $name${version:+@$version}... "
status=$(curl -s -o /dev/null -w "%{http_code}" \
  -X POST "$REGISTRY_URL/registry/addons/ingest" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $REGISTRY_API_KEY" \
  -d "$payload")

if [ "$status" -ge 200 ] && [ "$status" -lt 300 ]; then
  echo "ok ($status)"
else
  echo "FAILED ($status)"
  exit 1
fi
