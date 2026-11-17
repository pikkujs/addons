import { pikkuServices, pikkuWireServices } from '#pikku/setup'
import { ConsoleLogger, LocalSecretService, LocalVariablesService } from '@pikku/core/services'
import Database from 'better-sqlite3'
import { Kysely, SqliteDialect } from 'kysely'
import '../.pikku/pikku-bootstrap.gen.js'

export const createSingletonServices = pikkuServices(async (config, existingServices) => {
  const variables = existingServices?.variables ?? new LocalVariablesService()
  const secrets = existingServices?.secrets ?? new LocalSecretService(variables)
  const logger = new ConsoleLogger()
  const kysely = new Kysely<any>({
    dialect: new SqliteDialect({ database: new Database(config.sqliteDb!) }),
  })
  return { config, secrets, logger, variables, kysely }
})

export const createWireServices = pikkuWireServices(async () => ({}) as any)
