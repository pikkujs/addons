import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ScanPerformInput = z.object({
  body: z.string().optional(),
})

export const ScanPerformOutput = z.record(z.string(), z.unknown())

export const scanPerform = pikkuSessionlessFunc({
  description: "Scan perform",
  input: ScanPerformInput,
  output: ScanPerformOutput,
  func: async ({ urlScanIo }, data) => {
    return urlScanIo.call("POST", "/scan", data) as any
  },
})
