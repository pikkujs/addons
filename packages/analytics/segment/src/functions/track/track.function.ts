import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

const inputSchema = z.object({
  userId: z.string().optional().describe('User ID'),
  anonymousId: z.string().optional().describe('Anonymous ID'),
  event: z.string().describe('Event name'),
  properties: z.record(z.string(), z.unknown()).optional().describe('Event properties'),
  context: z.record(z.string(), z.unknown()).optional().describe('Context object'),
  timestamp: z.string().optional().describe('Timestamp (ISO format)'),
})

const outputSchema = z.object({
  success: z.boolean(),
})

type Input = z.infer<typeof inputSchema>
type Output = z.infer<typeof outputSchema>

export const trackEvent = pikkuSessionlessFunc({
  description: 'Track an event in Segment',
  node: { displayName: 'Track Event', category: 'Analytics', type: 'action' },
  input: inputSchema,
  output: outputSchema,
  func: async ({ segment }, data) => {
    await segment.request('POST', 'track', {
      body: {
        userId: data.userId,
        anonymousId: data.anonymousId,
        event: data.event,
        properties: data.properties,
        context: data.context,
        timestamp: data.timestamp,
      },
    })
    return { success: true }
  },
})
