import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ContactListGetAllInput = z.object({
  limit: z.number().int().optional(),
})

export const ContactListGetAllOutput = z.object({
  contactLists: z.array(z.object({
    id: z.string().optional(),
    name: z.string().optional(),
  })).optional(),
})

export const contactListGetAll = pikkuSessionlessFunc({
  description: "Get many contact lists",
  input: ContactListGetAllInput,
  output: ContactListGetAllOutput,
  func: async ({ emelia }, data) => {
    return emelia.call("GET", "/contact-lists", data) as any
  },
})
