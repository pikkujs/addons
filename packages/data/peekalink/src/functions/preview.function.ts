import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const PreviewInput = z.object({
  body: z.string().optional(),
})

export const PreviewOutput = z.record(z.string(), z.unknown())

export const preview = pikkuSessionlessFunc({
  description: "Preview",
  input: PreviewInput,
  output: PreviewOutput,
  func: async ({ peekalink }, data) => {
    return peekalink.call("POST", "/", data) as any
  },
})
