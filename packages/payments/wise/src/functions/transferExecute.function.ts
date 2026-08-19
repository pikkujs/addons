import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const TransferExecuteInput = z.object({
  profileId: z.string(),
  transferId: z.string(),
  type: z.string().optional(),
})

export const TransferExecuteOutput = z.record(z.string(), z.unknown())

export const transferExecute = pikkuSessionlessFunc({
  description: "Fund a transfer",
  input: TransferExecuteInput,
  output: TransferExecuteOutput,
  func: async ({ wise }, data) => {
    return wise.call("POST", "/v3/profiles/{profileId}/transfers/{transferId}/payments", data) as any
  },
})
