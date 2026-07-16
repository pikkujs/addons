import type {
  CoreConfig,
  CoreServices,
  CoreSingletonServices,
  CoreUserSession,
} from '@pikku/core'
import type { OpenWeatherMapService } from '../src/open-weather-map-api.service.js'

export interface Config extends CoreConfig {}

export interface UserSession extends CoreUserSession {}

export interface SingletonServices extends CoreSingletonServices<Config> {
  openWeatherMap: OpenWeatherMapService
}

export interface Services extends CoreServices<SingletonServices> {}
