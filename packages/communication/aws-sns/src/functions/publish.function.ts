import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const PublishInput = z.object({
  body: z.string().optional(),
})

export const PublishOutput = z.record(z.string(), z.unknown())

export const publish = pikkuSessionlessFunc({
  description: "Publish",
  input: PublishInput,
  output: PublishOutput,
  func: async ({ awsSns }, data) => {
    return awsSns.call("POST", "/publish", data) as any
  },
})
