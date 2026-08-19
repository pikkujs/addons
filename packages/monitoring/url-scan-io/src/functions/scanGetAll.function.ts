import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ScanGetAllInput = z.object({
  q: z.string().optional(),
})

export const ScanGetAllOutput = z.record(z.string(), z.unknown())

export const scanGetAll = pikkuSessionlessFunc({
  description: "Scan get all",
  input: ScanGetAllInput,
  output: ScanGetAllOutput,
  func: async ({ urlScanIo }, data) => {
    return urlScanIo.call("GET", "/search", data) as any
  },
})
