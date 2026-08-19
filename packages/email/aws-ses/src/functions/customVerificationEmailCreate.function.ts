import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const CustomVerificationEmailCreateInput = z.object({
  fromEmailAddress: z.string().optional(),
  templateName: z.string().optional(),
  templateSubject: z.string().optional(),
  templateContent: z.string().optional(),
  successRedirectionURL: z.string().optional(),
  failureRedirectionURL: z.string().optional(),
})

export const CustomVerificationEmailCreateOutput = z.record(z.string(), z.unknown())

export const customVerificationEmailCreate = pikkuSessionlessFunc({
  description: "Create a custom verification email template",
  input: CustomVerificationEmailCreateInput,
  output: CustomVerificationEmailCreateOutput,
  func: async ({ awsSes }, data) => {
    return awsSes.call("POST", "/customVerificationEmail/create", data) as any
  },
})
