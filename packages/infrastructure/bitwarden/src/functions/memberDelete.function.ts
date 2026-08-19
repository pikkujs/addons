import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const MemberDeleteInput = z.object({
  id: z.string(),
})

export const MemberDeleteOutput = z.record(z.string(), z.unknown())

export const memberDelete = pikkuSessionlessFunc({
  description: "Delete a member",
  input: MemberDeleteInput,
  output: MemberDeleteOutput,
  func: async ({ bitwarden }, data) => {
    return bitwarden.call("DELETE", "/public/members/{id}", data) as any
  },
})
