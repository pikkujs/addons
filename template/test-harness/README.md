# Pikku Test Harness Template

Template files for creating new Pikku test harnesses.

## Usage

Use the create-test-harness script:

```bash
./scripts/create-test-harness.sh <node-name> <folder>
```

Example:

```bash
./scripts/create-test-harness.sh ollama ai
```

## Placeholders

The script replaces these placeholders:

| Placeholder | Description | Example |
|-------------|-------------|---------|
| `{{NODE_NAME}}` | kebab-case package name | `ollama` |
| `{{nodeName}}` | camelCase service name | `ollama` |
| `{{NodeName}}` | PascalCase class name | `Ollama` |
| `{{NODE_NAME_UPPER}}` | SCREAMING_SNAKE for secrets | `OLLAMA` |

## After Scaffolding

1. Update `src/{{node-name}}-tests.function.ts` with test cases that exercise the package's functions via `rpc.invoke('{{nodeName}}:functionName', ...)`
2. Update `src/{{node-name}}.test.ts` with any required environment variables or setup
3. Run: `yarn install && yarn test`
