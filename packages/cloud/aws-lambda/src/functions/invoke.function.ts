import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const InvokeInput = z.object({
  body: z.string().optional(),
})

export const InvokeOutput = z.record(z.string(), z.unknown())

export const invoke = pikkuSessionlessFunc({
  description: "Invoke",
  input: InvokeInput,
  output: InvokeOutput,
  func: async ({ awsLambda }, data) => {
    return awsLambda.call("POST", "/invoke", data) as any
  },
})
