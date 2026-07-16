import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const TransferCreateInput = z.object({
  quoteUuid: z.string().optional(),
  targetAccount: z.string().optional(),
  customerTransactionId: z.string().optional(),
  reference: z.string().optional(),
})

export const TransferCreateOutput = z.record(z.string(), z.unknown())

export const transferCreate = pikkuSessionlessFunc({
  description: "Create a transfer",
  input: TransferCreateInput,
  output: TransferCreateOutput,
  func: async ({ wise }, data) => {
    return wise.call("POST", "/v1/transfers", data) as any
  },
})
