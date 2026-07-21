import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const InteractionClickInput = z.object({
  sessionId: z.string(),
  windowId: z.string(),
  elementDescription: z.string().optional(),
})

export const InteractionClickOutput = z.record(z.string(), z.unknown())

export const interactionClick = pikkuSessionlessFunc({
  description: "Click an element",
  input: InteractionClickInput,
  output: InteractionClickOutput,
  func: async ({ airtop }, data) => {
    return airtop.call("POST", "/sessions/{sessionId}/windows/{windowId}/click", data) as any
  },
})
