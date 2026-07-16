import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const TransferGetAllInput = z.object({
  profile: z.string(),
  createdDateStart: z.string().optional(),
  createdDateEnd: z.string().optional(),
  limit: z.number().optional(),
})

export const TransferGetAllOutput = z.record(z.string(), z.unknown())

export const transferGetAll = pikkuSessionlessFunc({
  description: "List transfers",
  input: TransferGetAllInput,
  output: TransferGetAllOutput,
  func: async ({ wise }, data) => {
    return wise.call("GET", "/v1/transfers", data) as any
  },
})
