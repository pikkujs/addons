import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const MemberUpdateInput = z.object({
  workspaceId: z.string(),
  memberId: z.string(),
  name: z.string().optional(),
  bio: z.string().optional(),
  company: z.string().optional(),
  location: z.string().optional(),
  pronouns: z.string().optional(),
  shipping_address: z.string().optional(),
  slug: z.string().optional(),
  tags_to_add: z.string().optional(),
  tag_list: z.string().optional(),
  url: z.string().optional(),
})

export const MemberUpdateOutput = z.record(z.string(), z.unknown())

export const memberUpdate = pikkuSessionlessFunc({
  description: "Update a member",
  input: MemberUpdateInput,
  output: MemberUpdateOutput,
  func: async ({ orbit }, data) => {
    return orbit.call("PUT", "/{workspaceId}/members/{memberId}", data) as any
  },
})
