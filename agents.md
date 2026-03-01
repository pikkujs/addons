# Pikku Addons

## Project Structure
- Monorepo at `/Users/yasser/git/pikku/addons`
- Packages under `packages/<category>/<name>/` (e.g., `packages/ai/whisper-asr/`)
- Tests co-located inside packages at `packages/<category>/<name>/test/`
- Package names use `@pikku/addon-<name>` prefix (e.g., `@pikku/addon-stripe`)
- Test pattern: testcontainers for integration tests, RPC to invoke functions
- Prefer fetch-based API services over third-party SDKs (keeps packages lightweight)
- Icons live at the package root as `<name>.svg` (referenced via `node.icon` in pikku.config.json)

## Creating a New Addon

Use `pikku new addon` to scaffold a new addon package. This generates all the boilerplate including package.json, pikku.config.json, service files, types, and an optional test harness.

### Basic usage

```bash
pikku new addon <name> [options]
```

The name must be lowercase alphanumerics, hyphens, and underscores (e.g., `sendgrid`, `google-sheets`).

### Options

| Option          | Description                                                      | Default     |
|-----------------|------------------------------------------------------------------|-------------|
| `--displayName` | Human-readable name (e.g., "SendGrid")                          | PascalCase of name |
| `--description` | Package description                                              | "{displayName} integration for Pikku" |
| `--category`    | Category (e.g., "Email", "Database")                             | "General"   |
| `--dir`, `-d`   | Output directory (overrides `scaffold.addonDir` in config)       | cwd         |
| `--secret`      | Include secret schema file for API keys                          | false       |
| `--variable`    | Include variable definition file                                 | false       |
| `--oauth`       | Include OAuth2 credential wiring and OAuth2Client-based service  | false       |
| `--test`        | Include test harness in `test/` subdirectory                     | true        |
| `--openapi`     | Path to OpenAPI YAML/JSON spec to generate typed functions from  | —           |

### Examples

```bash
# API key-based service
pikku new addon sendgrid --displayName "SendGrid" --description "Email delivery" --category Email --secret --dir packages/email

# OAuth2-based service
pikku new addon gmail --displayName "Gmail" --description "Gmail API" --category Email --oauth --dir packages/email

# Generate from OpenAPI spec
pikku new addon stripe --displayName "Stripe" --category Payments --secret --openapi ./stripe-openapi.yaml --dir packages/payments

# Minimal addon (no secrets, no test harness)
pikku new addon my-util --category Utility --test false
```

### What gets generated

```
<name>/
├── package.json              # @pikku/addon-<name>, peer deps on @pikku/core + zod
├── pikku.config.json          # addon: true, node metadata (icon, category, etc.)
├── tsconfig.json
├── README.md
├── src/
│   ├── index.ts               # Re-exports for published functions
│   ├── services.ts            # pikkuAddonServices factory
│   ├── <name>-api.service.ts  # API client (fetch-based or OAuth2Client)
│   ├── <name>.types.ts        # Zod schemas for API types
│   ├── <name>.secret.ts       # (if --secret or --oauth) Secret/credential wiring
│   └── <name>.variable.ts     # (if --variable) Variable wiring
├── types/
│   └── application-types.d.ts # Service type declarations
└── test/                      # (if --test, default true)
    ├── package.json           # @pikku/test-<name>, depends on file:..
    ├── pikku.config.json
    ├── tsconfig.json
    ├── src/
    │   ├── addons.ts          # wireAddon registration
    │   ├── services.ts        # Test service setup
    │   ├── <name>.test.ts     # Node test runner entry point
    │   └── <name>-tests.function.ts  # Test cases as pikku function
    └── types/
        └── application-types.d.ts
```

### After scaffolding

1. Add an icon SVG at `<name>.svg` in the package root
2. Update the API service with the real base URL, auth, and methods
3. Create function files in `src/functions/` for each operation
4. Export functions in `src/index.ts`
5. Build: `yarn install && yarn pikku && yarn build`
6. Write tests in `test/src/<name>-tests.function.ts`

### Legacy scripts (still available)

The shell scripts `scripts/create-package.sh` and `scripts/create-test-harness.sh` are older alternatives. Prefer `pikku new addon` for new packages.

## Docker/Container Setup
- Uses **podman**, not Docker
- Podman socket: `unix:///var/folders/9w/m7jglq897r98pc5hmwrqb_cc0000gn/T/podman/podman-machine-default-api.sock`
- Must set `DOCKER_HOST` and `TESTCONTAINERS_RYUK_DISABLED=true` for testcontainers to work with podman

## Test Patterns
- Tests use `LocalContent` service - can point `localFileUploadPath` at a fixtures directory to avoid file write/delete in tests
- Test functions use `pikkuSessionlessFunc`
- Tests run via: `node --import tsx --test src/**/*.test.ts`
- `yarn test` in test package directory (includes `pretest: pikku all`)

## Git
- Remote: `github.com:pikkujs/addons.git`
- Main branch: `main`
