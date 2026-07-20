// Supabase secret
export { supabaseSecretsSchema, type SupabaseSecrets } from './supabase.secret.js'

// Supabase database functions
export { selectRows, SelectInput, SelectOutput } from './functions/database/select.function.js'
export { insertRows, InsertInput, InsertOutput } from './functions/database/insert.function.js'
export { updateRows, UpdateInput, UpdateOutput } from './functions/database/update.function.js'
export { deleteRows, DeleteInput, DeleteOutput } from './functions/database/delete.function.js'
export { upsertRows, UpsertInput, UpsertOutput } from './functions/database/upsert.function.js'
export { rpc, RpcInput, RpcOutput } from './functions/database/rpc.function.js'

// Supabase pgvector (vector store) functions
export { search, VectorSearchInput, VectorSearchOutput } from './functions/vector/search.function.js'
export { query, VectorQueryInput, VectorQueryOutput } from './functions/vector/query.function.js'
export { ingest, VectorIngestInput, VectorIngestOutput } from './functions/vector/ingest.function.js'
