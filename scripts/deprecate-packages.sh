#!/bin/bash
# Deprecate removed/replaced addon packages on npm

set -euo pipefail

# Replaced by OpenAPI-generated versions
for pkg in bitbucket circleci github gitlab netlify quickchart slack; do
  echo "Deprecating @pikku/addon-${pkg}..."
  npm deprecate "@pikku/addon-${pkg}" "This package has been deprecated. Generate a replacement from the OpenAPI spec: pikku new addon ${pkg} --openapi <spec-url> --camelCase"
done

# Removed packages
for pkg in elevenlabs hackernews openai sendgrid stripe telegram whatsapp; do
  echo "Deprecating @pikku/addon-${pkg}..."
  npm deprecate "@pikku/addon-${pkg}" "This package has been deprecated and removed."
done

echo "Done. All 14 packages deprecated."
