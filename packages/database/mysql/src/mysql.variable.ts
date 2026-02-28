import { z } from 'zod'
import { wireVariable } from '@pikku/core/variable'

export const mysqlParamsSchema = z.object({
  host: z.string().default('localhost').describe('MySQL server hostname'),
  port: z.string().default('3306').describe('MySQL server port'),
  database: z.string().describe('MySQL database name'),
  ssl: z.string().optional().describe('Enable SSL connection'),
})

wireVariable({
  name: 'mysql_params',
  displayName: 'MySQL Params',
  description: 'MySQL connection parameters',
  variableId: 'MYSQL_PARAMS',
  schema: mysqlParamsSchema,
})
