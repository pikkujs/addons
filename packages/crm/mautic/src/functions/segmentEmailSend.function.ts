import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const SegmentEmailSendInput = z.object({
  segmentEmailId: z.string(),
})

export const SegmentEmailSendOutput = z.record(z.string(), z.unknown())

export const segmentEmailSend = pikkuSessionlessFunc({
  description: "Send an email to a segment",
  input: SegmentEmailSendInput,
  output: SegmentEmailSendOutput,
  func: async ({ mautic }, data) => {
    return mautic.call("POST", "/emails/{segmentEmailId}/send", data) as any
  },
})
