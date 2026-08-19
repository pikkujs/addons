import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const MemberDeleteInput = z.object({
  workspaceId: z.string(),
  memberId: z.string(),
})

export const MemberDeleteOutput = z.record(z.string(), z.unknown())

export const memberDelete = pikkuSessionlessFunc({
  description: "Delete a member",
  input: MemberDeleteInput,
  output: MemberDeleteOutput,
  func: async ({ orbit }, data) => {
    return orbit.call("DELETE", "/{workspaceId}/members/{memberId}", data) as any
  },
})
