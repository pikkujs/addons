import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const MemberGetInput = z.object({
  id: z.string(),
})

export const MemberGetOutput = z.record(z.string(), z.unknown())

export const memberGet = pikkuSessionlessFunc({
  description: "Get a member",
  input: MemberGetInput,
  output: MemberGetOutput,
  func: async ({ bitwarden }, data) => {
    return bitwarden.call("GET", "/public/members/{id}", data) as any
  },
})
