#!/bin/bash
#
# Create a new Pikku test harness from the template
#
# Usage: ./scripts/create-test-harness.sh <node-name> <folder>
#
# Example: ./scripts/create-test-harness.sh ollama ai
#
# Folders: database, cache, crm, email, communication, payments, ai, monitoring, productivity, ecommerce
#

set -e

if [ $# -lt 2 ]; then
  echo "Usage: $0 <node-name> <folder>"
  echo ""
  echo "Example: $0 ollama ai"
  echo ""
  echo "Folders: database, cache, crm, email, communication, payments, ai, monitoring, productivity, ecommerce"
  exit 1
fi

NODE_NAME="$1"           # kebab-case: ollama
FOLDER="$2"              # Folder: ai, database, etc.

# Derive other naming conventions
NODE_NAME_CAMEL=$(echo "$NODE_NAME" | awk -F'-' '{for(i=1;i<=NF;i++){if(i==1){printf "%s", $i}else{printf "%s", toupper(substr($i,1,1)) substr($i,2)}}}')
NODE_NAME_PASCAL=$(echo "$NODE_NAME" | awk -F'-' '{for(i=1;i<=NF;i++){printf "%s", toupper(substr($i,1,1)) substr($i,2)}}')
NODE_NAME_UPPER=$(echo "$NODE_NAME" | tr '[:lower:]-' '[:upper:]_')

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"
TEMPLATE_DIR="$ROOT_DIR/template/test-harness"
TARGET_DIR="$ROOT_DIR/tests/$FOLDER/$NODE_NAME"

if [ -d "$TARGET_DIR" ]; then
  echo "Error: Test harness directory already exists: $TARGET_DIR"
  exit 1
fi

echo "Creating test harness: @pikku/test-$NODE_NAME"
echo "  Folder: tests/$FOLDER/$NODE_NAME"
echo ""

# Create directory structure
mkdir -p "$TARGET_DIR/src"
mkdir -p "$TARGET_DIR/types"

# Function to process a template file
process_template() {
  local src="$1"
  local dest="$2"

  sed -e "s/{{NODE_NAME}}/$NODE_NAME/g" \
      -e "s/{{nodeName}}/$NODE_NAME_CAMEL/g" \
      -e "s/{{NodeName}}/$NODE_NAME_PASCAL/g" \
      -e "s/{{NODE_NAME_UPPER}}/$NODE_NAME_UPPER/g" \
      -e "s/{{node-name}}/$NODE_NAME/g" \
      "$src" > "$dest"
}

# Process config files
process_template "$TEMPLATE_DIR/package.json.tmpl" "$TARGET_DIR/package.json"
process_template "$TEMPLATE_DIR/pikku.config.json.tmpl" "$TARGET_DIR/pikku.config.json"
process_template "$TEMPLATE_DIR/tsconfig.json.tmpl" "$TARGET_DIR/tsconfig.json"

# Process src files
process_template "$TEMPLATE_DIR/src/services.ts.tmpl" "$TARGET_DIR/src/services.ts"
process_template "$TEMPLATE_DIR/src/node-name.test.ts.tmpl" "$TARGET_DIR/src/$NODE_NAME.test.ts"
process_template "$TEMPLATE_DIR/src/node-name-tests.function.ts.tmpl" "$TARGET_DIR/src/$NODE_NAME-tests.function.ts"

# Process types
process_template "$TEMPLATE_DIR/types/application-types.d.ts.tmpl" "$TARGET_DIR/types/application-types.d.ts"

echo "Test harness created at: $TARGET_DIR"
echo ""
echo "Next steps:"
echo "  1. Add '$TARGET_DIR' to the workspaces array in package.json"
echo "  2. Update src/$NODE_NAME-tests.function.ts with test cases"
echo "  3. Update src/$NODE_NAME.test.ts with any required setup (env vars, secrets)"
echo "  4. Run: yarn install && yarn test"
