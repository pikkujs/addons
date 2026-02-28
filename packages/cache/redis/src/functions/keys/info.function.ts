import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const InfoInput = z.object({})

export const InfoOutput = z.object({
  info: z.string().describe('Redis server information'),
})

type Output = z.infer<typeof InfoOutput>

export const info = pikkuSessionlessFunc({
  description: 'Returns information about the Redis server',
  node: { displayName: 'Server Info', category: 'Keys', type: 'action' },
  input: InfoInput,
  output: InfoOutput,
  func: async ({ redis }) => {
    const info = await redis.info()
    return { info }
  },
})
