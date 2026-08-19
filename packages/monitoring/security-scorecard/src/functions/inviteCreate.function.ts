import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const InviteCreateInput = z.object({
  email: z.string().optional(),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  message: z.string().optional(),
})

export const InviteCreateOutput = z.record(z.string(), z.unknown())

export const inviteCreate = pikkuSessionlessFunc({
  description: "Create an invitation",
  input: InviteCreateInput,
  output: InviteCreateOutput,
  func: async ({ securityScorecard }, data) => {
    return securityScorecard.call("POST", "/invitations", data) as any
  },
})
