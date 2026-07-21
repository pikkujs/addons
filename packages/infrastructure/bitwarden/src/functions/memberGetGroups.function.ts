import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const MemberGetGroupsInput = z.object({
  id: z.string(),
})

export const MemberGetGroupsOutput = z.record(z.string(), z.unknown())

export const memberGetGroups = pikkuSessionlessFunc({
  description: "Get member group ids",
  input: MemberGetGroupsInput,
  output: MemberGetGroupsOutput,
  func: async ({ bitwarden }, data) => {
    return bitwarden.call("GET", "/public/members/{id}/group-ids", data) as any
  },
})
