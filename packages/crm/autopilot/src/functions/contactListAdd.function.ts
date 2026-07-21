import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ContactListAddInput = z.object({
  listId: z.string(),
  contactId: z.string(),
})

export const ContactListAddOutput = z.record(z.string(), z.unknown())

export const contactListAdd = pikkuSessionlessFunc({
  description: "Add a contact to a list",
  input: ContactListAddInput,
  output: ContactListAddOutput,
  func: async ({ autopilot }, data) => {
    return autopilot.call("POST", "/list/{listId}/contact/{contactId}", data) as any
  },
})
