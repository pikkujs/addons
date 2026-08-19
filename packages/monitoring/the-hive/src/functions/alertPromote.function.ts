import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const AlertPromoteInput = z.object({
  id: z.string(),
})

export const AlertPromoteOutput = z.record(z.string(), z.unknown())

export const alertPromote = pikkuSessionlessFunc({
  description: "Promote an alert into a case",
  input: AlertPromoteInput,
  output: AlertPromoteOutput,
  func: async ({ theHive }, data) => {
    return theHive.call("POST", "/alert/{id}/createCase", data) as any
  },
})
