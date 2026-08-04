#!/usr/bin/env bash
# Sourced helper: the fabric registries a publish is mirrored into.
#
# An addon is only usable in an environment whose catalogue knows about it, so a
# release has to land in BOTH staging and production — staging is where the
# addon install flow is exercised before prod. Both environments run the same
# migrations, so the CI bearer (db/postgres/0038-registry-publisher-identity.sql
# in the fabric repo, only the sha256 is stored) authenticates against either;
# there is no second API key to manage.
#
# REGISTRY_URL (singular) still pins a single target — that is the escape hatch
# for pointing a manual backfill at one environment, or at a local API.

registry_targets() {
  if [ -n "${REGISTRY_URL:-}" ]; then
    echo "$REGISTRY_URL"
    return
  fi
  # shellcheck disable=SC2086 # deliberate word-splitting: the list is space-separated.
  printf '%s\n' ${REGISTRY_URLS:-https://api.pikkufabric.com https://api.pikkufabric.cloud}
}
