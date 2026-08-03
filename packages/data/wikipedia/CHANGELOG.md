# @pikku/addon-wikipedia

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

- 99d7625: New `@pikku/addon-wikipedia` addon — search Wikipedia and fetch article content
  via the public Wikimedia APIs. Dependency-free (built on `fetch`), no API key
  required (sends a contactable `User-Agent` per Wikimedia policy).

  - `wikipedia:search` — search Wikipedia, returning titles with plain-text
    snippets (via the MediaWiki Action API).
  - `wikipedia:summary` — fetch an article's short summary/extract, description,
    URL, and thumbnail by exact title (via the Wikimedia REST v1 API).
  - `wikipedia:getPage` — fetch an article's full plain-text content by exact
    title.

  Every function accepts an optional `language` (Wikipedia language edition,
  default `en`). Serves as the runnable target for n8n's LangChain Wikipedia tool.

### Patch Changes

- 99d7625: New OpenAPI-generated addons covering 140 integrations across AI, automation,
  cloud, communication, CRM, data, database, devops, documents, ecommerce, email,
  infrastructure, media, monitoring and payments. Each ships typed pikku functions,
  a credential schema and catalogue metadata (display name, categories, icon).
