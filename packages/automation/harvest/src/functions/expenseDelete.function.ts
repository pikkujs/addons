import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ExpenseDeleteInput = z.object({
  id: z.string(),
})

export const ExpenseDeleteOutput = z.record(z.string(), z.unknown())

export const expenseDelete = pikkuSessionlessFunc({
  description: "Expense delete",
  input: ExpenseDeleteInput,
  output: ExpenseDeleteOutput,
  func: async ({ harvest }, data) => {
    return harvest.call("DELETE", "/expenses/{id}", data) as any
  },
})
