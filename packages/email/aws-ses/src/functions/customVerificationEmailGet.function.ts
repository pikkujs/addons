import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const CustomVerificationEmailGetInput = z.object({
  templateName: z.string(),
})

export const CustomVerificationEmailGetOutput = z.record(z.string(), z.unknown())

export const customVerificationEmailGet = pikkuSessionlessFunc({
  description: "Get a custom verification email template",
  input: CustomVerificationEmailGetInput,
  output: CustomVerificationEmailGetOutput,
  func: async ({ awsSes }, data) => {
    return awsSes.call("GET", "/customVerificationEmail/get", data) as any
  },
})
