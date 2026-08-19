import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const TransferDeleteInput = z.object({
  transferId: z.string(),
})

export const TransferDeleteOutput = z.record(z.string(), z.unknown())

export const transferDelete = pikkuSessionlessFunc({
  description: "Cancel a transfer",
  input: TransferDeleteInput,
  output: TransferDeleteOutput,
  func: async ({ wise }, data) => {
    return wise.call("PUT", "/v1/transfers/{transferId}/cancel", data) as any
  },
})
