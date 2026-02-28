# Pikku External Packages - Key Learnings

## Project Structure
- Monorepo at `/Users/yasser/git/pikku/external`
- Packages under `packages/<category>/<name>/` (e.g., `packages/ai/whisper-asr/`)
- Tests under `tests/<category>/<name>/` (e.g., `tests/ai/whisper-asr/`)
- Package names MUST use `@pikku/external-<name>` prefix (e.g., `@pikku/external-stripe`)
- Test pattern: testcontainers for integration tests, `runPikkuFunc` to invoke functions via RPC
- Prefer fetch-based API services over third-party SDKs (keeps packages lightweight)

## Docker/Container Setup
- Uses **podman**, not Docker
- Podman socket: `unix:///var/folders/9w/m7jglq897r98pc5hmwrqb_cc0000gn/T/podman/podman-machine-default-api.sock`
- Must set `DOCKER_HOST` and `TESTCONTAINERS_RYUK_DISABLED=true` for testcontainers to work with podman

## Test Patterns
- Tests use `LocalContent` service - can point `localFileUploadPath` at a fixtures directory to avoid file write/delete in tests
- Test functions use `pikkuSessionlessFunc` with `internal: true`
- Tests run via: `node --import tsx --test src/**/*.test.ts`
- `yarn test` in test package directory (includes `pretest: pikku all`)

## Git
- Remote: `github.com:pikkujs/external.git`
- Main branch: `main`
