import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const EmailDeleteRecordInput = z.object({
  emailRecordId: z.string(),
})

export const EmailDeleteRecordOutput = z.record(z.string(), z.unknown())

export const emailDeleteRecord = pikkuSessionlessFunc({
  description: "Delete an email record",
  input: EmailDeleteRecordInput,
  output: EmailDeleteRecordOutput,
  func: async ({ keap }, data) => {
    return keap.call("DELETE", "/emails/{emailRecordId}", data) as any
  },
})
