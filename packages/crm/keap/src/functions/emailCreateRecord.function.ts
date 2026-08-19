import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const EmailCreateRecordInput = z.object({
  sent_to_address: z.string().optional(),
  sent_from_address: z.string().optional(),
  subject: z.string().optional(),
})

export const EmailCreateRecordOutput = z.record(z.string(), z.unknown())

export const emailCreateRecord = pikkuSessionlessFunc({
  description: "Create an email record",
  input: EmailCreateRecordInput,
  output: EmailCreateRecordOutput,
  func: async ({ keap }, data) => {
    return keap.call("POST", "/emails", data) as any
  },
})
