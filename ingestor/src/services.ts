import {
  ConsoleLogger,
  LocalVariablesService,
  LocalSecretService,
} from '@pikku/core/services'
import { CFWorkerSchemaService } from '@pikku/schema-cfworker'
import { pikkuConfig, pikkuServices } from '#pikku'
import Database from 'better-sqlite3'
import { CamelCasePlugin, Kysely, SqliteDialect } from 'kysely'
import { SerializePlugin } from 'kysely-plugin-serialize'
import { SQLiteKyselyWorkflowService } from '@pikku/kysely-sqlite'
import type { KyselyPikkuDB } from '@pikku/kysely'

export const createConfig = pikkuConfig(async () => {
  return {}
})

export const createSingletonServices = pikkuServices(
  async (config, existingServices) => {
    const logger = existingServices?.logger || new ConsoleLogger()
    const variables =
      existingServices?.variables || new LocalVariablesService(process.env)
    const secrets = existingServices?.secrets || new LocalSecretService()
    const schema = existingServices?.schema || new CFWorkerSchemaService(logger)

    const db = new Kysely<KyselyPikkuDB>({
      dialect: new SqliteDialect({ database: new Database('ingestor.db') }),
      plugins: [new CamelCasePlugin(), new SerializePlugin()],
    })

    const workflowService = new SQLiteKyselyWorkflowService(db)
    await workflowService.init()

    return {
      config,
      logger,
      variables,
      secrets,
      schema,
      workflowService,
    }
  }
)
