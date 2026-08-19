import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ContactListRemoveInput = z.object({
  listId: z.string(),
  contactId: z.string(),
})

export const ContactListRemoveOutput = z.record(z.string(), z.unknown())

export const contactListRemove = pikkuSessionlessFunc({
  description: "Remove a contact from a list",
  input: ContactListRemoveInput,
  output: ContactListRemoveOutput,
  func: async ({ autopilot }, data) => {
    return autopilot.call("DELETE", "/list/{listId}/contact/{contactId}", data) as any
  },
})
