import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const MemberGetAllInput = z.object({
  listId: z.string(),
  count: z.number().int().optional(),
  offset: z.number().int().optional(),
  status: z.string().optional(),
})

export const MemberGetAllOutput = z.record(z.string(), z.unknown())

export const memberGetAll = pikkuSessionlessFunc({
  description: "Get many members on a list",
  input: MemberGetAllInput,
  output: MemberGetAllOutput,
  func: async ({ mailchimp }, data) => {
    return mailchimp.call("GET", "/lists/{listId}/members", data) as any
  },
})
