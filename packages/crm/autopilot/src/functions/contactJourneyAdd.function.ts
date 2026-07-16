import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ContactJourneyAddInput = z.object({
  triggerId: z.string(),
  contactId: z.string(),
})

export const ContactJourneyAddOutput = z.record(z.string(), z.unknown())

export const contactJourneyAdd = pikkuSessionlessFunc({
  description: "Add a contact to a journey",
  input: ContactJourneyAddInput,
  output: ContactJourneyAddOutput,
  func: async ({ autopilot }, data) => {
    return autopilot.call("POST", "/trigger/{triggerId}/contact/{contactId}", data) as any
  },
})
