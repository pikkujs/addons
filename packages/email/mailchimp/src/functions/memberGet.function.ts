import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const MemberGetInput = z.object({
  listId: z.string(),
  email: z.string(),
  fields: z.string().optional(),
  exclude_fields: z.string().optional(),
})

export const MemberGetOutput = z.record(z.string(), z.unknown())

export const memberGet = pikkuSessionlessFunc({
  description: "Get a member on a list",
  input: MemberGetInput,
  output: MemberGetOutput,
  func: async ({ mailchimp }, data) => {
    return mailchimp.call("GET", "/lists/{listId}/members/{email}", data) as any
  },
})
