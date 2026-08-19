import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const MemberGetInput = z.object({
  workspaceId: z.string(),
  memberId: z.string(),
})

export const MemberGetOutput = z.record(z.string(), z.unknown())

export const memberGet = pikkuSessionlessFunc({
  description: "Get a member",
  input: MemberGetInput,
  output: MemberGetOutput,
  func: async ({ orbit }, data) => {
    return orbit.call("GET", "/{workspaceId}/members/{memberId}", data) as any
  },
})
