import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const MemberGetAllOutput = z.record(z.string(), z.unknown())

export const memberGetAll = pikkuSessionlessFunc({
  description: "List members",
  output: MemberGetAllOutput,
  func: async ({ bitwarden }) => {
    return bitwarden.call("GET", "/public/members") as any
  },
})
