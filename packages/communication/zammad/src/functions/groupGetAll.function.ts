import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const GroupGetAllInput = z.object({
  limit: z.number().int().optional(),
})

export const GroupGetAllOutput = z.record(z.string(), z.unknown())

export const groupGetAll = pikkuSessionlessFunc({
  description: "Get all groups",
  input: GroupGetAllInput,
  output: GroupGetAllOutput,
  func: async ({ zammad }, data) => {
    return zammad.call("GET", "/groups", data) as any
  },
})
