import type { AIEmbeddingService } from '@pikku/core/services'
import type { CoreConfig, CoreServices, CoreSingletonServices, CoreUserSession } from '@pikku/core/types'
import type { SupabaseClient } from '@supabase/supabase-js'

export interface Config extends CoreConfig {}

export interface UserSession extends CoreUserSession {}

export interface SingletonServices extends CoreSingletonServices<Config> {
  supabase: SupabaseClient
  aiEmbedding?: AIEmbeddingService
}

export interface Services extends CoreServices<SingletonServices> {}
