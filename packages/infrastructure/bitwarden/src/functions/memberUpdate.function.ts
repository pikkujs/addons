import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const MemberUpdateInput = z.object({
  id: z.string(),
  type: z.number().optional(),
  accessAll: z.boolean().optional(),
  externalId: z.string().optional(),
})

export const MemberUpdateOutput = z.record(z.string(), z.unknown())

export const memberUpdate = pikkuSessionlessFunc({
  description: "Update a member",
  input: MemberUpdateInput,
  output: MemberUpdateOutput,
  func: async ({ bitwarden }, data) => {
    return bitwarden.call("PUT", "/public/members/{id}", data) as any
  },
})
