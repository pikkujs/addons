import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const InteractionTypeInput = z.object({
  sessionId: z.string(),
  windowId: z.string(),
  text: z.string().optional(),
})

export const InteractionTypeOutput = z.record(z.string(), z.unknown())

export const interactionType = pikkuSessionlessFunc({
  description: "Type text into an element",
  input: InteractionTypeInput,
  output: InteractionTypeOutput,
  func: async ({ airtop }, data) => {
    return airtop.call("POST", "/sessions/{sessionId}/windows/{windowId}/type", data) as any
  },
})
