import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ChecklistDeleteInput = z.object({
  checklistId: z.string(),
})

export const ChecklistDeleteOutput = z.record(z.string(), z.unknown())

export const checklistDelete = pikkuSessionlessFunc({
  description: "Checklist delete",
  input: ChecklistDeleteInput,
  output: ChecklistDeleteOutput,
  func: async ({ clickup }, data) => {
    return clickup.call("DELETE", "/checklist/{checklistId}", data) as any
  },
})
