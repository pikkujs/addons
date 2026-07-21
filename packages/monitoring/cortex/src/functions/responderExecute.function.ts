import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ResponderExecuteInput = z.object({
  responderId: z.string(),
  dataType: z.string().optional(),
  label: z.string().optional(),
})

export const ResponderExecuteOutput = z.object({
  id: z.string().optional(),
  status: z.string().optional(),
})

export const responderExecute = pikkuSessionlessFunc({
  description: "Run a responder on an entity",
  input: ResponderExecuteInput,
  output: ResponderExecuteOutput,
  func: async ({ cortex }, data) => {
    return cortex.call("POST", "/responder/{responderId}/run", data) as any
  },
})
