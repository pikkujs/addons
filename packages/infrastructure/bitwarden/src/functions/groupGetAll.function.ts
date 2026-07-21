import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const GroupGetAllOutput = z.record(z.string(), z.unknown())

export const groupGetAll = pikkuSessionlessFunc({
  description: "List groups",
  output: GroupGetAllOutput,
  func: async ({ bitwarden }) => {
    return bitwarden.call("GET", "/public/groups") as any
  },
})
