#!/bin/bash
#
# Create a new Pikku addon package from the template
#
# Usage: ./scripts/create-package.sh <node-name> "<Display Name>" "<Description>" "<Category>" <folder>
#
# Example: ./scripts/create-package.sh sendgrid "SendGrid" "Email delivery service" "Messages" email
#
# Folders: database, cache, crm, email, communication, payments, ai, monitoring, productivity, ecommerce
#

set -e

if [ $# -lt 5 ]; then
  echo "Usage: $0 <node-name> \"<Display Name>\" \"<Description>\" \"<Category>\" <folder>"
  echo ""
  echo "Example: $0 sendgrid \"SendGrid\" \"Email delivery service\" \"Messages\" email"
  echo ""
  echo "Folders: database, cache, crm, email, communication, payments, ai, monitoring, productivity, ecommerce"
  exit 1
fi

NODE_NAME="$1"           # kebab-case: sendgrid
DISPLAY_NAME="$2"        # Display: SendGrid
DESCRIPTION="$3"         # Description
CATEGORY="$4"            # Category: Messages
FOLDER="$5"              # Folder: email, database, etc.

# Derive other naming conventions
# Convert kebab-case to camelCase (e.g., send-grid -> sendGrid)
NODE_NAME_CAMEL=$(echo "$NODE_NAME" | awk -F'-' '{for(i=1;i<=NF;i++){if(i==1){printf "%s", $i}else{printf "%s", toupper(substr($i,1,1)) substr($i,2)}}}')
# Convert kebab-case to PascalCase (e.g., send-grid -> SendGrid)
NODE_NAME_PASCAL=$(echo "$NODE_NAME" | awk -F'-' '{for(i=1;i<=NF;i++){printf "%s", toupper(substr($i,1,1)) substr($i,2)}}')
# Convert to SCREAMING_SNAKE_CASE (e.g., send-grid -> SEND_GRID)
NODE_NAME_UPPER=$(echo "$NODE_NAME" | tr '[:lower:]-' '[:upper:]_')

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PACKAGES_DIR="$(dirname "$SCRIPT_DIR")/packages"
TEMPLATE_DIR="$(dirname "$SCRIPT_DIR")/template/addon-package"
TARGET_DIR="$PACKAGES_DIR/$FOLDER/$NODE_NAME"

# Create folder if it doesn't exist
mkdir -p "$PACKAGES_DIR/$FOLDER"

if [ -d "$TARGET_DIR" ]; then
  echo "Error: Package directory already exists: $TARGET_DIR"
  exit 1
fi

echo "Creating package: @pikku/$NODE_NAME"
echo "  Display Name: $DISPLAY_NAME"
echo "  Description: $DESCRIPTION"
echo "  Category: $CATEGORY"
echo "  Folder: $FOLDER"
echo ""

# Create directory structure
mkdir -p "$TARGET_DIR/src/functions"
mkdir -p "$TARGET_DIR/types"
mkdir -p "$TARGET_DIR/icons"

# Function to process a template file
process_template() {
  local src="$1"
  local dest="$2"

  sed -e "s/{{NODE_NAME}}/$NODE_NAME/g" \
      -e "s/{{nodeName}}/$NODE_NAME_CAMEL/g" \
      -e "s/{{NodeName}}/$NODE_NAME_PASCAL/g" \
      -e "s/{{NODE_NAME_UPPER}}/$NODE_NAME_UPPER/g" \
      -e "s/{{DISPLAY_NAME}}/$DISPLAY_NAME/g" \
      -e "s/{{DESCRIPTION}}/$DESCRIPTION/g" \
      -e "s/{{CATEGORY}}/$CATEGORY/g" \
      -e "s/{{node-name}}/$NODE_NAME/g" \
      "$src" > "$dest"
}

# Process root config files
process_template "$TEMPLATE_DIR/package.json.tmpl" "$TARGET_DIR/package.json"
process_template "$TEMPLATE_DIR/pikku.config.json.tmpl" "$TARGET_DIR/pikku.config.json"
process_template "$TEMPLATE_DIR/tsconfig.json.tmpl" "$TARGET_DIR/tsconfig.json"

# Process src files
process_template "$TEMPLATE_DIR/src/index.ts.tmpl" "$TARGET_DIR/src/index.ts"
process_template "$TEMPLATE_DIR/src/node-name.variable.ts.tmpl" "$TARGET_DIR/src/$NODE_NAME.variable.ts"
process_template "$TEMPLATE_DIR/src/services.ts.tmpl" "$TARGET_DIR/src/services.ts"
process_template "$TEMPLATE_DIR/src/node-name.secret.ts.tmpl" "$TARGET_DIR/src/$NODE_NAME.secret.ts"
process_template "$TEMPLATE_DIR/src/node-name-api.service.ts.tmpl" "$TARGET_DIR/src/$NODE_NAME-api.service.ts"
process_template "$TEMPLATE_DIR/src/node-name.types.ts.tmpl" "$TARGET_DIR/src/$NODE_NAME.types.ts"

# Process types
process_template "$TEMPLATE_DIR/types/application-types.d.ts.tmpl" "$TARGET_DIR/types/application-types.d.ts"

# Copy README (no processing needed for now)
cp "$TEMPLATE_DIR/README.md" "$TARGET_DIR/README.md"

echo "Package created at: $TARGET_DIR"
echo ""
echo "Next steps:"
echo "  1. Add icon SVG to: $TARGET_DIR/icons/$NODE_NAME.svg"
echo "  2. Update src/$NODE_NAME.secret.ts with secret fields"
echo "  3. Update src/$NODE_NAME-api.service.ts with:"
echo "     - BASE_URL for the API"
echo "     - Auth header pattern"
echo "     - API methods for each operation"
echo "  4. Create function files in src/functions/ for each operation"
echo "  5. Export functions in src/index.ts"
echo "  6. Run: cd $TARGET_DIR && yarn install && yarn pikku && yarn build"
