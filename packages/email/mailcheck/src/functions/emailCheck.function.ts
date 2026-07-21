import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const EmailCheckInput = z.object({
  body: z.string().optional(),
})

export const EmailCheckOutput = z.record(z.string(), z.unknown())

export const emailCheck = pikkuSessionlessFunc({
  description: "Email check",
  input: EmailCheckInput,
  output: EmailCheckOutput,
  func: async ({ mailcheck }, data) => {
    return mailcheck.call("POST", "/email/check", data) as any
  },
})
