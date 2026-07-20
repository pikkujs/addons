---
'@pikku/addon-pinecone': minor
---

New `@pikku/addon-pinecone` addon — dependency-free Pinecone vector store over the
data-plane REST API. Functions: `search` (query by a pre-computed vector), `query`
(embed a text query via the `aiEmbedding` service then search), `upsert`, and `ingest` (embed chunks + upsert, for RAG ingestion). The
`collection` field maps to the Pinecone namespace. Backs the n8n importer's RAG
retrieval flows.
