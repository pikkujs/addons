import type {
  CoreConfig,
  CoreServices,
  CoreSingletonServices,
  CoreUserSession,
} from '@pikku/core'
import type { SupabaseClient } from '@supabase/supabase-js'

export interface Config extends CoreConfig {}

export interface UserSession extends CoreUserSession {}

export interface SingletonServices extends CoreSingletonServices<Config> {
  supabase: SupabaseClient
}

export interface Services extends CoreServices<SingletonServices> {}
