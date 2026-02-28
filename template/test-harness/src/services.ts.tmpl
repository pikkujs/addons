import type {
  SingletonServices,
} from '../types/application-types.js'
import {
  CreateSingletonServices,
} from '@pikku/core'
import {
  ConsoleLogger,
  LocalVariablesService,
  LocalSecretService,
} from '@pikku/core/services'

import '../.pikku/pikku-bootstrap.gen.js'

export const createSingletonServices: CreateSingletonServices<
  {},
  SingletonServices
> = async (_config, existingServices) => {
  const variables = existingServices?.variables ?? new LocalVariablesService(process.env)
  const secrets = existingServices?.secrets ?? new LocalSecretService(variables)

  return {
    logger: existingServices?.logger ?? new ConsoleLogger(),
    variables,
    secrets,
  }
}
