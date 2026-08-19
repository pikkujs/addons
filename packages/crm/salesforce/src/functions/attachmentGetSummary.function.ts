import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const AttachmentGetSummaryOutput = z.record(z.string(), z.unknown())

export const attachmentGetSummary = pikkuSessionlessFunc({
  description: "Get Attachment summary",
  output: AttachmentGetSummaryOutput,
  func: async ({ salesforce }) => {
    return salesforce.call("GET", "/query/Attachment/summary") as any
  },
})
