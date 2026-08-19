import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ExpenseUpdateInput = z.object({
  id: z.string(),
  notes: z.string().optional(),
})

export const ExpenseUpdateOutput = z.record(z.string(), z.unknown())

export const expenseUpdate = pikkuSessionlessFunc({
  description: "Expense update",
  input: ExpenseUpdateInput,
  output: ExpenseUpdateOutput,
  func: async ({ harvest }, data) => {
    return harvest.call("PATCH", "/expenses/{id}", data) as any
  },
})
