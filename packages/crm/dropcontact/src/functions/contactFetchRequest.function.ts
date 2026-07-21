import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ContactFetchRequestInput = z.object({
  requestId: z.string(),
})

export const ContactFetchRequestOutput = z.object({
  success: z.boolean().optional(),
  reason: z.string().optional(),
  data: z.array(z.record(z.string(), z.unknown())).optional(),
})

export const contactFetchRequest = pikkuSessionlessFunc({
  description: "Fetch the result of an enrichment request",
  input: ContactFetchRequestInput,
  output: ContactFetchRequestOutput,
  func: async ({ dropcontact }, data) => {
    return dropcontact.call("GET", "/batch/{requestId}", data) as any
  },
})
