import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const GroupUpdateMembersInput = z.object({
  id: z.string(),
  memberIds: z.array(z.string()).optional(),
})

export const GroupUpdateMembersOutput = z.record(z.string(), z.unknown())

export const groupUpdateMembers = pikkuSessionlessFunc({
  description: "Update group member ids",
  input: GroupUpdateMembersInput,
  output: GroupUpdateMembersOutput,
  func: async ({ bitwarden }, data) => {
    return bitwarden.call("PUT", "/public/groups/{id}/member-ids", data) as any
  },
})
