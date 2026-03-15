import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const EventsCaptureInput = z.object({
  distinctId: z.string().describe('Unique user identifier'),
  event: z.string().describe('Event name'),
  properties: z.record(z.string(), z.unknown()).optional().describe('Event properties'),
  timestamp: z.string().optional().describe('Event timestamp (ISO format)'),
})

export const EventsCaptureOutput = z.object({
  status: z.number().describe('Response status'),
})

type Input = z.infer<typeof EventsCaptureInput>
type Output = z.infer<typeof EventsCaptureOutput>

export const eventsCapture = pikkuSessionlessFunc({
  description: 'Capture an event in PostHog',
  node: { displayName: 'Capture Event', category: 'Analytics', type: 'action' },
  input: EventsCaptureInput,
  output: EventsCaptureOutput,
  func: async ({ posthog }, data) => {
    await posthog.request('POST', 'capture', {
      body: {
        api_key: posthog.apiKey,
        distinct_id: data.distinctId,
        event: data.event,
        properties: data.properties || {},
        timestamp: data.timestamp,
      },
    })
    return { status: 1 }
  },
})
