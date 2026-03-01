import type {
  CoreConfig,
  CoreServices,
  CoreSingletonServices,
  CoreUserSession,
} from '@pikku/core'
import type { Transporter } from 'nodemailer'
import type { ContentService } from '@pikku/core'

export interface Config extends CoreConfig {}
export interface UserSession extends CoreUserSession {}

export interface SingletonServices extends CoreSingletonServices<Config> {
  emailTransport: Transporter
  content: ContentService
}

export interface Services extends CoreServices<SingletonServices> {}
