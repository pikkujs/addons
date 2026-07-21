import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CustomVerificationEmailSendInput = z.object({
  email: z.string().optional(),
  templateName: z.string().optional(),
  configurationSetName: z.string().optional(),
})

export const CustomVerificationEmailSendOutput = z.record(z.string(), z.unknown())

export const customVerificationEmailSend = pikkuSessionlessFunc({
  description: "Send a custom verification email",
  input: CustomVerificationEmailSendInput,
  output: CustomVerificationEmailSendOutput,
  func: async ({ awsSes }, data) => {
    return awsSes.call("POST", "/customVerificationEmail/send", data) as any
  },
})
