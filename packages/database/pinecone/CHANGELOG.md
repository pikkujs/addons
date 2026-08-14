# @pikku/addon-pinecone

## 0.2.1

### Patch Changes

- 31b0085: Resolve every entry point under `dist`

  `imports["#pikku"]` named `./.pikku/pikku-types.gen.ts` — a TypeScript file, at
  runtime, inside `node_modules` — and `files` published a second copy of
  `.pikku` at the package root whose generated output imported a `../src/` and
  `../types/` the tarball did not contain. The `pikku-bootstrap.gen.js` consumers
  import through the `./.pikku/*` subpath only ever existed under `dist`.
  Everything resolved through the workspace link and none of it resolved on
  install.

  Every entry point now points at the built copy, and `files` is just
  `["dist"]`. The addon's own build resolves `#pikku` through tsconfig
  `paths`, so nothing has to reach into the source tree. Consumer import
  specifiers are unchanged.

- f74a5d6: Ship `types/application-types.d.ts` in the published package.

  The build copied `.pikku` into `dist` but left `types` behind, and TypeScript
  never emits a hand-written `.d.ts` to outDir — so `dist/types` did not exist.
  Every generated file under `dist/.pikku` imports `SingletonServices`, `Services`,
  `Config` and `UserSession` from `../../types/application-types.d.js`, which left
  consumers typechecking against a module that was not there: 14 errors inside
  `node_modules` for an app that merely depends on the addon.

- 0c11caf: Reveal the vault secret before handing it to the upstream SDK

  `@pikku/core` changed `SecretService.getSecret` from `Promise<T>` to
  `Promise<SecretValue<T>>` in 0.12.77. Every addon still passed the wrapper
  straight into its client, so the secret never reached the wire: a scalar key
  threw `SecretCoercionError` on the first request, where the SDK builds an
  `Authorization` header, and a `*_CREDENTIALS` object silently read every field
  as `undefined` instead. Both failed far from the cause — the stack pointed at
  the vendor SDK, not at the secret.

  Each addon now calls `.reveal()` at the boundary where the value is handed to
  its client, and the peer range starts at the release that introduced
  `SecretValue` so the two contracts can no longer both satisfy it.

## 0.2.0

### Minor Changes

- d62c42a: New `@pikku/addon-pinecone` addon — dependency-free Pinecone vector store over the
  data-plane REST API. Functions: `search` (query by a pre-computed vector), `query`
  (embed a text query via the `aiEmbedding` service then search), `upsert`, and `ingest` (embed chunks + upsert, for RAG ingestion). The
  `collection` field maps to the Pinecone namespace. Backs the n8n importer's RAG
  retrieval flows.

### Patch Changes

- 84fa090: Update to `@pikku/core` 0.12.74 and `@pikku/cli` 0.12.96, and migrate the
  breaking changes that came with them: `wireSecret`/`wireVariable`/`wireCredential`
  are now `defineSecret`/`defineVariable`/`defineCredential`, `OAuth2Client` is gone
  from `@pikku/core/oauth2` (OAuth tokens are owned by the platform credential
  service and resolved per request), `AIEmbeddingService` exposes
  `embedQuery`/`embedDocuments` instead of `embed`/`embedMany`, `LocalContent`
  takes a `JWTService`, and `SecretService` is confined to service factories.
