import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ChecklistCreateInput = z.object({
  taskId: z.string(),
  name: z.string().optional(),
})

export const ChecklistCreateOutput = z.record(z.string(), z.unknown())

export const checklistCreate = pikkuSessionlessFunc({
  description: "Checklist create",
  input: ChecklistCreateInput,
  output: ChecklistCreateOutput,
  func: async ({ clickup }, data) => {
    return clickup.call("POST", "/task/{taskId}/checklist", data) as any
  },
})
