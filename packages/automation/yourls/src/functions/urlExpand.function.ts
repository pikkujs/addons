import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UrlExpandInput = z.object({
  body: z.string().optional(),
})

export const UrlExpandOutput = z.record(z.string(), z.unknown())

export const urlExpand = pikkuSessionlessFunc({
  description: "Url expand",
  input: UrlExpandInput,
  output: UrlExpandOutput,
  func: async ({ yourls }, data) => {
    return yourls.call("POST", "/yourls-api-expand", data) as any
  },
})
