import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const GroupUpdateInput = z.object({
  id: z.string(),
  name: z.string().optional(),
  accessAll: z.boolean().optional(),
  externalId: z.string().optional(),
})

export const GroupUpdateOutput = z.record(z.string(), z.unknown())

export const groupUpdate = pikkuSessionlessFunc({
  description: "Update a group",
  input: GroupUpdateInput,
  output: GroupUpdateOutput,
  func: async ({ bitwarden }, data) => {
    return bitwarden.call("PUT", "/public/groups/{id}", data) as any
  },
})
