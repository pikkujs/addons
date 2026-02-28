import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const PublishInput = z.object({
  channel: z.string().describe('The channel to publish to'),
  message: z.string().describe('The message to publish'),
})

export const PublishOutput = z.object({
  subscribers: z.number().describe('Number of subscribers that received the message'),
})

export const publish = pikkuSessionlessFunc({
  description: 'Publishes a message to a Redis channel',
  node: { displayName: 'Publish Message', category: 'PubSub', type: 'action' },
  input: PublishInput,
  output: PublishOutput,
  func: async ({ redis }, { channel, message }) => {
    const subscribers = await redis.publish(channel, message)
    return { subscribers }
  },
})
