---
'@pikku/addon-qdrant': minor
---

New `@pikku/addon-qdrant` addon — dependency-free Qdrant vector store over the
REST API. Functions: `search` (query by a pre-computed vector), `query` (embed a
text query via the `aiEmbedding` service then search), `upsert`, and `ingest` (embed chunks + upsert, for RAG ingestion). Backs the n8n
importer's RAG retrieval flows (retrieve-as-tool and chainRetrievalQa).
