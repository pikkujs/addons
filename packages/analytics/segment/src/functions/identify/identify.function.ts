import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const IdentifyUserInput = z.object({
  userId: z.string().optional().describe('User ID'),
  anonymousId: z.string().optional().describe('Anonymous ID'),
  traits: z.record(z.string(), z.unknown()).optional().describe('User traits'),
  context: z.record(z.string(), z.unknown()).optional().describe('Context object'),
  timestamp: z.string().optional().describe('Timestamp (ISO format)'),
})

export const IdentifyUserOutput = z.object({
  success: z.boolean(),
})

type Input = z.infer<typeof IdentifyUserInput>
type Output = z.infer<typeof IdentifyUserOutput>

export const identifyUser = pikkuSessionlessFunc({
  description: 'Identify a user in Segment',
  node: { displayName: 'Identify User', category: 'Analytics', type: 'action' },
  input: IdentifyUserInput,
  output: IdentifyUserOutput,
  func: async ({ segment }, data) => {
    await segment.request('POST', 'identify', {
      body: {
        userId: data.userId,
        anonymousId: data.anonymousId,
        traits: data.traits,
        context: data.context,
        timestamp: data.timestamp,
      },
    })
    return { success: true }
  },
})
