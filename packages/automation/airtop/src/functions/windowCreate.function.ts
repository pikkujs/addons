import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const WindowCreateInput = z.object({
  sessionId: z.string(),
  url: z.string().optional(),
})

export const WindowCreateOutput = z.record(z.string(), z.unknown())

export const windowCreate = pikkuSessionlessFunc({
  description: "Create a window",
  input: WindowCreateInput,
  output: WindowCreateOutput,
  func: async ({ airtop }, data) => {
    return airtop.call("POST", "/sessions/{sessionId}/windows", data) as any
  },
})
