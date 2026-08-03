# @pikku/addon-execution

## 0.2.1

### Patch Changes

- 84fa090: Update to `@pikku/core` 0.12.74 and `@pikku/cli` 0.12.96, and migrate the
  breaking changes that came with them: `wireSecret`/`wireVariable`/`wireCredential`
  are now `defineSecret`/`defineVariable`/`defineCredential`, `OAuth2Client` is gone
  from `@pikku/core/oauth2` (OAuth tokens are owned by the platform credential
  service and resolved per request), `AIEmbeddingService` exposes
  `embedQuery`/`embedDocuments` instead of `embed`/`embedMany`, `LocalContent`
  takes a `JWTService`, and `SecretService` is confined to service factories.

## 0.2.0

### Minor Changes

- 99d7625: New `@pikku/addon-execution` addon — run shell commands and spawn processes from
  a workflow. Dependency-free (built on Node's `child_process`).

  - `execution:execute` — run a shell command string, capturing `stdout`,
    `stderr`, and `exitCode` (with optional `cwd` / `timeout`).
  - `execution:spawnCommand` — spawn a program with an argument array and no shell
    (injection-proof), same captured output.

  Neither throws on a non-zero exit — the exit code is returned for the caller to
  handle.
