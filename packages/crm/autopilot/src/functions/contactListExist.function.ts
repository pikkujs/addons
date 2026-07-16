import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ContactListExistInput = z.object({
  listId: z.string(),
  contactId: z.string(),
})

export const ContactListExistOutput = z.record(z.string(), z.unknown())

export const contactListExist = pikkuSessionlessFunc({
  description: "Check if a contact is in a list",
  input: ContactListExistInput,
  output: ContactListExistOutput,
  func: async ({ autopilot }, data) => {
    return autopilot.call("GET", "/list/{listId}/contact/{contactId}", data) as any
  },
})
