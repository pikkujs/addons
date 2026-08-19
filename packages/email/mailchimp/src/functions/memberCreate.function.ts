import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const MemberCreateInput = z.object({
  listId: z.string(),
  email_address: z.string().optional(),
  status: z.string().optional(),
  email_type: z.string().optional(),
  language: z.string().optional(),
  vip: z.boolean().optional(),
})

export const MemberCreateOutput = z.record(z.string(), z.unknown())

export const memberCreate = pikkuSessionlessFunc({
  description: "Create a new member on a list",
  input: MemberCreateInput,
  output: MemberCreateOutput,
  func: async ({ mailchimp }, data) => {
    return mailchimp.call("POST", "/lists/{listId}/members", data) as any
  },
})
