import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const TransactionGetReportInput = z.object({
  companyId: z.string(),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
})

export const TransactionGetReportOutput = z.record(z.string(), z.unknown())

export const transactionGetReport = pikkuSessionlessFunc({
  description: "Transaction get report",
  input: TransactionGetReportInput,
  output: TransactionGetReportOutput,
  func: async ({ quickbooks }, data) => {
    return quickbooks.call("GET", "/company/{companyId}/reports/TransactionList", data) as any
  },
})
