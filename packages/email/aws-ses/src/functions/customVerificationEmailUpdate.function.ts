import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const CustomVerificationEmailUpdateInput = z.object({
  templateName: z.string().optional(),
  fromEmailAddress: z.string().optional(),
  templateSubject: z.string().optional(),
  templateContent: z.string().optional(),
  successRedirectionURL: z.string().optional(),
  failureRedirectionURL: z.string().optional(),
})

export const CustomVerificationEmailUpdateOutput = z.record(z.string(), z.unknown())

export const customVerificationEmailUpdate = pikkuSessionlessFunc({
  description: "Update a custom verification email template",
  input: CustomVerificationEmailUpdateInput,
  output: CustomVerificationEmailUpdateOutput,
  func: async ({ awsSes }, data) => {
    return awsSes.call("POST", "/customVerificationEmail/update", data) as any
  },
})
