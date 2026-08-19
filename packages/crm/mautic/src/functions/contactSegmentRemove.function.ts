import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ContactSegmentRemoveInput = z.object({
  segmentId: z.string(),
  contactId: z.string(),
})

export const ContactSegmentRemoveOutput = z.record(z.string(), z.unknown())

export const contactSegmentRemove = pikkuSessionlessFunc({
  description: "Remove a contact from a segment",
  input: ContactSegmentRemoveInput,
  output: ContactSegmentRemoveOutput,
  func: async ({ mautic }, data) => {
    return mautic.call("POST", "/segments/{segmentId}/contact/{contactId}/remove", data) as any
  },
})
