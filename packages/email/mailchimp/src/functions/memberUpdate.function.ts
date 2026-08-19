import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const MemberUpdateInput = z.object({
  listId: z.string(),
  email: z.string(),
  email_address: z.string().optional(),
  status: z.string().optional(),
  email_type: z.string().optional(),
  language: z.string().optional(),
  vip: z.boolean().optional(),
})

export const MemberUpdateOutput = z.record(z.string(), z.unknown())

export const memberUpdate = pikkuSessionlessFunc({
  description: "Update a member on a list",
  input: MemberUpdateInput,
  output: MemberUpdateOutput,
  func: async ({ mailchimp }, data) => {
    return mailchimp.call("PUT", "/lists/{listId}/members/{email}", data) as any
  },
})
