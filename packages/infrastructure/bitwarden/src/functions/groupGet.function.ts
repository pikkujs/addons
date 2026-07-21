import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const GroupGetInput = z.object({
  id: z.string(),
})

export const GroupGetOutput = z.record(z.string(), z.unknown())

export const groupGet = pikkuSessionlessFunc({
  description: "Get a group",
  input: GroupGetInput,
  output: GroupGetOutput,
  func: async ({ bitwarden }, data) => {
    return bitwarden.call("GET", "/public/groups/{id}", data) as any
  },
})
