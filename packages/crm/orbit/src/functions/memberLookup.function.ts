import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const MemberLookupInput = z.object({
  workspaceId: z.string(),
  source: z.string(),
  username: z.string().optional(),
  uid: z.string().optional(),
  email: z.string().optional(),
  host: z.string().optional(),
})

export const MemberLookupOutput = z.record(z.string(), z.unknown())

export const memberLookup = pikkuSessionlessFunc({
  description: "Lookup a member by identity",
  input: MemberLookupInput,
  output: MemberLookupOutput,
  func: async ({ orbit }, data) => {
    return orbit.call("GET", "/{workspaceId}/members/find", data) as any
  },
})
