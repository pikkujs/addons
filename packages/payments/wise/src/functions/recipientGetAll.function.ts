import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const RecipientGetAllOutput = z.record(z.string(), z.unknown())

export const recipientGetAll = pikkuSessionlessFunc({
  description: "List recipient accounts",
  output: RecipientGetAllOutput,
  func: async ({ wise }) => {
    return wise.call("GET", "/v1/accounts") as any
  },
})
