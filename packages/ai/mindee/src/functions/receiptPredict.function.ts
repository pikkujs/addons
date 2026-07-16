import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ReceiptPredictInput = z.object({
  document: z.string().optional(),
  filename: z.string().optional(),
})

export const ReceiptPredictOutput = z.record(z.string(), z.unknown())

export const receiptPredict = pikkuSessionlessFunc({
  description: "Predict receipt data via OCR",
  input: ReceiptPredictInput,
  output: ReceiptPredictOutput,
  func: async ({ mindee }, data) => {
    return mindee.call("POST", "/products/mindee/expense_receipts/v4/predict", data) as any
  },
})
