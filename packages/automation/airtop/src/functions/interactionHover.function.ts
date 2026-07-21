import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const InteractionHoverInput = z.object({
  sessionId: z.string(),
  windowId: z.string(),
  elementDescription: z.string().optional(),
})

export const InteractionHoverOutput = z.record(z.string(), z.unknown())

export const interactionHover = pikkuSessionlessFunc({
  description: "Hover over an element",
  input: InteractionHoverInput,
  output: InteractionHoverOutput,
  func: async ({ airtop }, data) => {
    return airtop.call("POST", "/sessions/{sessionId}/windows/{windowId}/hover", data) as any
  },
})
