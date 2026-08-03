# @pikku/addon-pinecone

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
