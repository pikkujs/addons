import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const MemberDeleteInput = z.object({
  listId: z.string(),
  email: z.string(),
})

export const MemberDeleteOutput = z.record(z.string(), z.unknown())

export const memberDelete = pikkuSessionlessFunc({
  description: "Delete a member on a list",
  input: MemberDeleteInput,
  output: MemberDeleteOutput,
  func: async ({ mailchimp }, data) => {
    return mailchimp.call("POST", "/lists/{listId}/members/{email}/actions/delete-permanent", data) as any
  },
})
