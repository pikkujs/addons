import { z } from 'zod'
import { wireVariable } from '@pikku/core/variable'

export const postgresParamsSchema = z.object({
  host: z.string().default('localhost').describe('PostgreSQL server hostname'),
  port: z.string().default('5432').describe('PostgreSQL server port'),
  database: z.string().describe('PostgreSQL database name'),
  ssl: z.string().optional().describe('Enable SSL connection'),
})

wireVariable({
  name: 'postgres_params',
  displayName: 'PostgreSQL Params',
  description: 'PostgreSQL connection parameters',
  variableId: 'POSTGRES_PARAMS',
  schema: postgresParamsSchema,
})
