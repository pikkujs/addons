import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ExpenseGetAllOutput = z.record(z.string(), z.unknown())

export const expenseGetAll = pikkuSessionlessFunc({
  description: "Expense get all",
  output: ExpenseGetAllOutput,
  func: async ({ harvest }) => {
    return harvest.call("GET", "/expenses") as any
  },
})
