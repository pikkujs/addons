import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const SessionCreateInput = z.object({
  profileName: z.string().optional(),
  timeoutMinutes: z.number().optional(),
})

export const SessionCreateOutput = z.record(z.string(), z.unknown())

export const sessionCreate = pikkuSessionlessFunc({
  description: "Create a session",
  input: SessionCreateInput,
  output: SessionCreateOutput,
  func: async ({ airtop }, data) => {
    return airtop.call("POST", "/sessions", data) as any
  },
})
