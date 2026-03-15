import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const TrackEventInput = z.object({
  userId: z.string().optional().describe('User ID'),
  anonymousId: z.string().optional().describe('Anonymous ID'),
  event: z.string().describe('Event name'),
  properties: z.record(z.string(), z.unknown()).optional().describe('Event properties'),
  context: z.record(z.string(), z.unknown()).optional().describe('Context object'),
  timestamp: z.string().optional().describe('Timestamp (ISO format)'),
})

export const TrackEventOutput = z.object({
  success: z.boolean(),
})

type Input = z.infer<typeof TrackEventInput>
type Output = z.infer<typeof TrackEventOutput>

export const trackEvent = pikkuSessionlessFunc({
  description: 'Track an event in Segment',
  node: { displayName: 'Track Event', category: 'Analytics', type: 'action' },
  input: TrackEventInput,
  output: TrackEventOutput,
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
