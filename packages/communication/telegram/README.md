# Pikku Package Template

Template files for creating new Pikku external packages.

## Usage

Use the create-package script:

```bash
./scripts/create-package.sh <node-name> "<Display Name>" "<Description>" "<Category>"
```

Example:

```bash
./scripts/create-package.sh sendgrid "SendGrid" "Email delivery service" "Messages"
```

## Placeholders

The script replaces these placeholders:

| Placeholder | Description | Example |
|-------------|-------------|---------|
| `{{NODE_NAME}}` | kebab-case package name | `sendgrid` |
| `{{nodeName}}` | camelCase service name | `sendGrid` |
| `{{NodeName}}` | PascalCase class name | `SendGrid` |
| `{{NODE_NAME_UPPER}}` | SCREAMING_SNAKE for secrets | `SENDGRID` |
| `{{DISPLAY_NAME}}` | Human readable name | `SendGrid` |
| `{{DESCRIPTION}}` | Package description | `Email delivery service` |
| `{{CATEGORY}}` | Forge category | `Messages` |

## After Scaffolding

1. Add icon SVG to `icons/{node-name}.svg`
2. Update secret schema with required fields
3. Update API service with:
   - `BASE_URL` for the API
   - Auth header pattern
   - Methods for each operation
4. Create function files for each operation
5. Export functions in `index.ts`
6. Build: `yarn install && yarn pikku && yarn build`
