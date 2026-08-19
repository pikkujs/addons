import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const GroupGetMembersInput = z.object({
  id: z.string(),
})

export const GroupGetMembersOutput = z.record(z.string(), z.unknown())

export const groupGetMembers = pikkuSessionlessFunc({
  description: "Get group member ids",
  input: GroupGetMembersInput,
  output: GroupGetMembersOutput,
  func: async ({ bitwarden }, data) => {
    return bitwarden.call("GET", "/public/groups/{id}/member-ids", data) as any
  },
})
