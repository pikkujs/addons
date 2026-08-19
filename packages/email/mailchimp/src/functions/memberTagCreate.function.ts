import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const MemberTagCreateInput = z.object({
  listId: z.string(),
  email: z.string(),
  tags: z.array(z.record(z.string(), z.unknown())).optional(),
  is_syncing: z.boolean().optional(),
})

export const MemberTagCreateOutput = z.record(z.string(), z.unknown())

export const memberTagCreate = pikkuSessionlessFunc({
  description: "Add tags to a list member",
  input: MemberTagCreateInput,
  output: MemberTagCreateOutput,
  func: async ({ mailchimp }, data) => {
    return mailchimp.call("POST", "/lists/{listId}/members/{email}/tags", data) as any
  },
})
