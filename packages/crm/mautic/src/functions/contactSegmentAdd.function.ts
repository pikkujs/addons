import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ContactSegmentAddInput = z.object({
  segmentId: z.string(),
  contactId: z.string(),
})

export const ContactSegmentAddOutput = z.record(z.string(), z.unknown())

export const contactSegmentAdd = pikkuSessionlessFunc({
  description: "Add a contact to a segment",
  input: ContactSegmentAddInput,
  output: ContactSegmentAddOutput,
  func: async ({ mautic }, data) => {
    return mautic.call("POST", "/segments/{segmentId}/contact/{contactId}/add", data) as any
  },
})
