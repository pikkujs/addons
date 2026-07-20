---
'@pikku/addon-openai': minor
---

Export `OpenAIEmbeddingService` — an `AIEmbeddingService` (from `@pikku/core`)
backed by the OpenAI embeddings API. Construct it with an OpenAI client and a
model, then wire it into `singletonServices.aiEmbedding` so vector-store addons
(Qdrant, Pinecone, Supabase) can embed at index and query time against one fixed
model.
