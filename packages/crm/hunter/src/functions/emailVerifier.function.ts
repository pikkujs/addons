import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const EmailVerifierInput = z.object({
  email: z.string(),
})

export const EmailVerifierOutput = z.record(z.string(), z.unknown())

export const emailVerifier = pikkuSessionlessFunc({
  description: "Verify the deliverability of an email address",
  input: EmailVerifierInput,
  output: EmailVerifierOutput,
  func: async ({ hunter }, data) => {
    return hunter.call("GET", "/email-verifier", data) as any
  },
})
