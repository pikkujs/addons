import type {
  CoreSingletonServices,
  CoreConfig,
  CoreServices,
  CoreUserSession,
  CreateWireServices,
} from '@pikku/core'

export interface Config extends CoreConfig {}
export interface UserSession extends CoreUserSession {}
export interface SingletonServices extends CoreSingletonServices {}
export interface Services extends CoreServices {}
export type { CreateWireServices }
