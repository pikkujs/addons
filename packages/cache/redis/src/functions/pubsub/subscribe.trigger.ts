import { z } from 'zod'
import { pikkuTriggerFunc } from '#pikku'

export const SubscribeConfig = z.object({
  channels: z.set(z.string()).describe('Comma-separated list of channels to subscribe to. Supports wildcards (*) for pattern subscription.'),
  jsonParseBody: z.boolean().default(false).describe('Whether to try to parse the message as JSON'),
})

export const SubscribeOutput = z.object({
  channel: z.string().describe('The channel the message was received on'),
  message: z.any().describe('The message content (string or parsed JSON object)'),
})

export const subscribe = pikkuTriggerFunc({
  node: { displayName: 'Redis Trigger', category: 'PubSub', type: 'trigger' },
  title: 'Redis Subscribe',
  description: 'Subscribes to Redis pub/sub channels and triggers on new messages',
  input: SubscribeConfig,
  output: SubscribeOutput,
  func: async ({ redis }, { channels, jsonParseBody }, { trigger }) => {
    const subscriber = redis.duplicate()

    const channelList = Array.from(channels)
    const hasWildcard = channelList.some((c: string) => c.includes('*'))

    if (hasWildcard) {
      subscriber.on('pmessage', (_pattern: string, channel: string, message: string) => {
        let parsedMessage: string | Record<string, unknown> = message
        if (jsonParseBody) {
          try {
            parsedMessage = JSON.parse(message)
          } catch {}
        }
        trigger.invoke({ channel, message: parsedMessage })
      })

      await subscriber.psubscribe(...channelList)
    } else {
      subscriber.on('message', (channel: string, message: string) => {
        let parsedMessage: string | Record<string, unknown> = message
        if (jsonParseBody) {
          try {
            parsedMessage = JSON.parse(message)
          } catch {}
        }
        trigger.invoke({ channel, message: parsedMessage })
      })

      await subscriber.subscribe(...channelList)
    }

    return async () => {
      if (hasWildcard) {
        await subscriber.punsubscribe()
      } else {
        await subscriber.unsubscribe()
      }
      await subscriber.quit()
    }
  },
})
