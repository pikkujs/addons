import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const TransferGetInput = z.object({
  transferId: z.string(),
})

export const TransferGetOutput = z.record(z.string(), z.unknown())

export const transferGet = pikkuSessionlessFunc({
  description: "Get transfer by id",
  input: TransferGetInput,
  output: TransferGetOutput,
  func: async ({ wise }, data) => {
    return wise.call("GET", "/v1/transfers/{transferId}", data) as any
  },
})
