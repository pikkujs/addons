import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ExpenseCreateInput = z.object({
  project_id: z.string().optional(),
  expense_category_id: z.string().optional(),
  spent_date: z.string().optional(),
})

export const ExpenseCreateOutput = z.record(z.string(), z.unknown())

export const expenseCreate = pikkuSessionlessFunc({
  description: "Expense create",
  input: ExpenseCreateInput,
  output: ExpenseCreateOutput,
  func: async ({ harvest }, data) => {
    return harvest.call("POST", "/expenses", data) as any
  },
})
