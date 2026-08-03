# @pikku/addon-reddit

## 0.0.3

### Patch Changes

- 84fa090: Update to `@pikku/core` 0.12.74 and `@pikku/cli` 0.12.96, and migrate the
  breaking changes that came with them: `wireSecret`/`wireVariable`/`wireCredential`
  are now `defineSecret`/`defineVariable`/`defineCredential`, `OAuth2Client` is gone
  from `@pikku/core/oauth2` (OAuth tokens are owned by the platform credential
  service and resolved per request), `AIEmbeddingService` exposes
  `embedQuery`/`embedDocuments` instead of `embed`/`embedMany`, `LocalContent`
  takes a `JWTService`, and `SecretService` is confined to service factories.

## 0.0.2

### Patch Changes

- 99d7625: New OpenAPI-generated addons covering 140 integrations across AI, automation,
  cloud, communication, CRM, data, database, devops, documents, ecommerce, email,
  infrastructure, media, monitoring and payments. Each ships typed pikku functions,
  a credential schema and catalogue metadata (display name, categories, icon).
