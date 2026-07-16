import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CustomVerificationEmailDeleteInput = z.object({
  templateName: z.string().optional(),
})

export const CustomVerificationEmailDeleteOutput = z.record(z.string(), z.unknown())

export const customVerificationEmailDelete = pikkuSessionlessFunc({
  description: "Delete a custom verification email template",
  input: CustomVerificationEmailDeleteInput,
  output: CustomVerificationEmailDeleteOutput,
  func: async ({ awsSes }, data) => {
    return awsSes.call("POST", "/customVerificationEmail/delete", data) as any
  },
})
