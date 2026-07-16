import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const GroupDeleteInput = z.object({
  id: z.string(),
})

export const GroupDeleteOutput = z.record(z.string(), z.unknown())

export const groupDelete = pikkuSessionlessFunc({
  description: "Delete a group",
  input: GroupDeleteInput,
  output: GroupDeleteOutput,
  func: async ({ bitwarden }, data) => {
    return bitwarden.call("DELETE", "/public/groups/{id}", data) as any
  },
})
