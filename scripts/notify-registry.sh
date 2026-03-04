#!/usr/bin/env bash
set -euo pipefail

if [ -z "${REGISTRY_API_KEY:-}" ]; then
  echo "Error: REGISTRY_API_KEY environment variable is required"
  exit 1
fi

if [ -z "${1:-}" ]; then
  echo "Usage: notify-registry.sh <package-name>"
  exit 1
fi

REGISTRY_URL="${REGISTRY_URL:-https://pikku-registry.fly.dev}"
name="$1"

echo -n "Ingesting $name... "
status=$(curl -s -o /dev/null -w "%{http_code}" \
  -X POST "$REGISTRY_URL/api/ingest" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $REGISTRY_API_KEY" \
  -d "{\"packageName\":\"$name\"}")

if [ "$status" -ge 200 ] && [ "$status" -lt 300 ]; then
  echo "ok ($status)"
else
  echo "FAILED ($status)"
  exit 1
fi
