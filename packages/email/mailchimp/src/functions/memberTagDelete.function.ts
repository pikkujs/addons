import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const MemberTagDeleteInput = z.object({
  listId: z.string(),
  email: z.string(),
  tags: z.array(z.record(z.string(), z.unknown())).optional(),
  is_syncing: z.boolean().optional(),
})

export const MemberTagDeleteOutput = z.record(z.string(), z.unknown())

export const memberTagDelete = pikkuSessionlessFunc({
  description: "Remove tags from a list member",
  input: MemberTagDeleteInput,
  output: MemberTagDeleteOutput,
  func: async ({ mailchimp }, data) => {
    return mailchimp.call("POST", "/lists/{listId}/members/{email}/tags-remove", data) as any
  },
})
