import { z } from 'zod'
import { wireSecret } from '@pikku/core/secret'

export const redisPasswordSchema = z.string().optional().describe('Redis password')

export type RedisPassword = z.infer<typeof redisPasswordSchema>

wireSecret({
  name: 'password',
  displayName: 'Redis Password',
  description: 'Redis authentication password',
  secretId: 'REDIS_PASSWORD',
  schema: redisPasswordSchema,
})
