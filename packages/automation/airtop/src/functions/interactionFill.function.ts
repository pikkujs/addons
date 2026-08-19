import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const InteractionFillInput = z.object({
  sessionId: z.string(),
  windowId: z.string(),
  formData: z.string().optional(),
})

export const InteractionFillOutput = z.record(z.string(), z.unknown())

export const interactionFill = pikkuSessionlessFunc({
  description: "Fill a form via automation",
  input: InteractionFillInput,
  output: InteractionFillOutput,
  func: async ({ airtop }, data) => {
    return airtop.call("POST", "/async/sessions/{sessionId}/windows/{windowId}/execute-automation", data) as any
  },
})
