import { z } from 'zod'
import { wireVariable } from '@pikku/core/variable'

export const redisParamsSchema = z.object({
  host: z.string().default('localhost').describe('Redis server hostname'),
  port: z.string().default('6379').describe('Redis server port'),
  database: z.string().default('0').describe('Redis database number'),
  tls: z.string().optional().describe('Enable TLS/SSL connection'),
})

wireVariable({
  name: 'redis_params',
  displayName: 'Redis Params',
  description: 'Redis connection parameters',
  variableId: 'REDIS_PARAMS',
  schema: redisParamsSchema,
})
