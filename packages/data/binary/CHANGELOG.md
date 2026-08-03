# @pikku/addon-binary

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

- 62ad083: New `@pikku/addon-binary` addon — dependency-free conversion between binary file
  data (base64) and JSON. Functions: `extractText`, `extractJson`, `toTextFile`,
  `toJsonFile`, and `moveBinaryData`. Complements the format-specific parsers
  (`read-pdf`, `spreadsheet`, `xml`) for the text/JSON/raw-binary cases that need
  no heavy parser.
