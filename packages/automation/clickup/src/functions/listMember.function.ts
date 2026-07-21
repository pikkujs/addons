import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ListMemberInput = z.object({
  listId: z.string(),
})

export const ListMemberOutput = z.record(z.string(), z.unknown())

export const listMember = pikkuSessionlessFunc({
  description: "List member",
  input: ListMemberInput,
  output: ListMemberOutput,
  func: async ({ clickup }, data) => {
    return clickup.call("GET", "/list/{listId}/member", data) as any
  },
})
