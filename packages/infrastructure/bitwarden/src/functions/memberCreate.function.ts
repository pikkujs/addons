import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const MemberCreateInput = z.object({
  email: z.string().optional(),
  type: z.number().optional(),
  accessAll: z.boolean().optional(),
  externalId: z.string().optional(),
})

export const MemberCreateOutput = z.record(z.string(), z.unknown())

export const memberCreate = pikkuSessionlessFunc({
  description: "Create a member",
  input: MemberCreateInput,
  output: MemberCreateOutput,
  func: async ({ bitwarden }, data) => {
    return bitwarden.call("POST", "/public/members", data) as any
  },
})
