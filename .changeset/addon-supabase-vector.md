---
'@pikku/addon-supabase': minor
---

Add vector functions to `@pikku/addon-supabase`: `search` (query a pgvector store
by a pre-computed vector via a match function, default `match_documents`) and
`query` (embed a text query via the `aiEmbedding` service then search) and `ingest` (embed chunks + insert into a pgvector table). Backs the
n8n importer's Supabase RAG retrieval flows.
