import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const GroupGetAllInput = z.object({
  limit: z.number().int().optional(),
  "filter[name]": z.string().optional(),
})

export const GroupGetAllOutput = z.object({
  data: z.array(z.record(z.string(), z.unknown())).optional(),
})

export const groupGetAll = pikkuSessionlessFunc({
  description: "List groups",
  input: GroupGetAllInput,
  output: GroupGetAllOutput,
  func: async ({ mailerLite }, data) => {
    return mailerLite.call("GET", "/groups", data) as any
  },
})
