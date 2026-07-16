import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const GroupCreateInput = z.object({
  name: z.string().optional(),
  accessAll: z.boolean().optional(),
  externalId: z.string().optional(),
})

export const GroupCreateOutput = z.record(z.string(), z.unknown())

export const groupCreate = pikkuSessionlessFunc({
  description: "Create a group",
  input: GroupCreateInput,
  output: GroupCreateOutput,
  func: async ({ bitwarden }, data) => {
    return bitwarden.call("POST", "/public/groups", data) as any
  },
})
