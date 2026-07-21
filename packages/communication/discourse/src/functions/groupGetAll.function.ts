import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const GroupGetAllOutput = z.record(z.string(), z.unknown())

export const groupGetAll = pikkuSessionlessFunc({
  description: "Get all groups",
  output: GroupGetAllOutput,
  func: async ({ discourse }) => {
    return discourse.call("GET", "/groups.json") as any
  },
})
