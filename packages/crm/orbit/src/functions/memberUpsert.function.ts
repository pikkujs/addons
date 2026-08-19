import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const MemberUpsertInput = z.object({
  workspaceId: z.string(),
  email: z.string().optional(),
  github: z.string().optional(),
  twitter: z.string().optional(),
  name: z.string().optional(),
  bio: z.string().optional(),
  company: z.string().optional(),
  location: z.string().optional(),
  tags_to_add: z.string().optional(),
  tag_list: z.string().optional(),
})

export const MemberUpsertOutput = z.record(z.string(), z.unknown())

export const memberUpsert = pikkuSessionlessFunc({
  description: "Create or update a member",
  input: MemberUpsertInput,
  output: MemberUpsertOutput,
  func: async ({ orbit }, data) => {
    return orbit.call("POST", "/{workspaceId}/members", data) as any
  },
})
