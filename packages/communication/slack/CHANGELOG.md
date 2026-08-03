# @pikku/addon-slack

## 0.1.3

### Patch Changes

- 84fa090: Update to `@pikku/core` 0.12.74 and `@pikku/cli` 0.12.96, and migrate the
  breaking changes that came with them: `wireSecret`/`wireVariable`/`wireCredential`
  are now `defineSecret`/`defineVariable`/`defineCredential`, `OAuth2Client` is gone
  from `@pikku/core/oauth2` (OAuth tokens are owned by the platform credential
  service and resolved per request), `AIEmbeddingService` exposes
  `embedQuery`/`embedDocuments` instead of `embed`/`embedMany`, `LocalContent`
  takes a `JWTService`, and `SecretService` is confined to service factories.

## 0.1.2

### Patch Changes

- 99d7625: Replace the handcrafted implementations with OpenAPI-generated ones, widening
  coverage to the full upstream API surface. These supersede the versions removed
  in ee82d82 and pick up from the 0.1.1 already on npm.
