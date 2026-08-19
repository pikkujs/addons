import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ScanGetInput = z.object({
  q: z.string().optional(),
})

export const ScanGetOutput = z.record(z.string(), z.unknown())

export const scanGet = pikkuSessionlessFunc({
  description: "Scan get",
  input: ScanGetInput,
  output: ScanGetOutput,
  func: async ({ urlScanIo }, data) => {
    return urlScanIo.call("GET", "/result/{id}", data) as any
  },
})
