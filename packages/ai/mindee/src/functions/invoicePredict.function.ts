import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const InvoicePredictInput = z.object({
  document: z.string().optional(),
  filename: z.string().optional(),
})

export const InvoicePredictOutput = z.record(z.string(), z.unknown())

export const invoicePredict = pikkuSessionlessFunc({
  description: "Predict invoice data via OCR",
  input: InvoicePredictInput,
  output: InvoicePredictOutput,
  func: async ({ mindee }, data) => {
    return mindee.call("POST", "/products/mindee/invoices/v4/predict", data) as any
  },
})
