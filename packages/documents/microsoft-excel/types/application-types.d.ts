import type {
  CoreConfig,
  CoreServices,
  CoreSingletonServices,
  CoreUserSession,
} from '@pikku/core'
import type { MicrosoftExcelService } from '../src/microsoft-excel-api.service.js'

export interface Config extends CoreConfig {}

export interface UserSession extends CoreUserSession {}

export interface SingletonServices extends CoreSingletonServices<Config> {
  microsoftExcel: MicrosoftExcelService
}

export interface Services extends CoreServices<SingletonServices> {}
