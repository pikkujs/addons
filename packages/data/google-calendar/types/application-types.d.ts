import type {
  CoreConfig,
  CoreServices,
  CoreSingletonServices,
  CoreUserSession,
} from '@pikku/core'
import type { GoogleCalendarService } from '../src/google-calendar-api.service.js'

export interface Config extends CoreConfig {}

export interface UserSession extends CoreUserSession {}

export interface SingletonServices extends CoreSingletonServices<Config> {
  googleCalendar: GoogleCalendarService
}

export interface Services extends CoreServices<SingletonServices> {}
