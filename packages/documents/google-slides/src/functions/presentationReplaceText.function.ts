import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const PresentationReplaceTextInput = z.object({
  presentationId: z.string(),
  requests: z.array(z.record(z.string(), z.unknown())).optional(),
})

export const PresentationReplaceTextOutput = z.object({
  presentationId: z.string().optional(),
})

export const presentationReplaceText = pikkuSessionlessFunc({
  description: "Replace text in a presentation",
  input: PresentationReplaceTextInput,
  output: PresentationReplaceTextOutput,
  func: async ({ googleSlides }, data) => {
    return googleSlides.call("POST", "/presentations/{presentationId}:batchUpdate", data) as any
  },
})
