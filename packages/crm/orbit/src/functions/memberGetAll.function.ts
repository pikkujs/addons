import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const MemberGetAllInput = z.object({
  workspaceId: z.string(),
  sort: z.string().optional(),
  direction: z.string().optional(),
  page: z.number().optional(),
})

export const MemberGetAllOutput = z.record(z.string(), z.unknown())

export const memberGetAll = pikkuSessionlessFunc({
  description: "Get many members in a workspace",
  input: MemberGetAllInput,
  output: MemberGetAllOutput,
  func: async ({ orbit }, data) => {
    return orbit.call("GET", "/{workspaceId}/members", data) as any
  },
})
