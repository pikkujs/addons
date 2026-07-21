import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const MemberUpdateGroupsInput = z.object({
  id: z.string(),
  groupIds: z.array(z.string()).optional(),
})

export const MemberUpdateGroupsOutput = z.record(z.string(), z.unknown())

export const memberUpdateGroups = pikkuSessionlessFunc({
  description: "Update member group ids",
  input: MemberUpdateGroupsInput,
  output: MemberUpdateGroupsOutput,
  func: async ({ bitwarden }, data) => {
    return bitwarden.call("PUT", "/public/members/{id}/group-ids", data) as any
  },
})
