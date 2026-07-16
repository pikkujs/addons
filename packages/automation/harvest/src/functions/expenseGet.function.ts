import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ExpenseGetInput = z.object({
  id: z.string(),
})

export const ExpenseGetOutput = z.record(z.string(), z.unknown())

export const expenseGet = pikkuSessionlessFunc({
  description: "Expense get",
  input: ExpenseGetInput,
  output: ExpenseGetOutput,
  func: async ({ harvest }, data) => {
    return harvest.call("GET", "/expenses/{id}", data) as any
  },
})
