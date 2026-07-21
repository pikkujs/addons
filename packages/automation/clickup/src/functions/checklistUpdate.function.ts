import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ChecklistUpdateInput = z.object({
  checklistId: z.string(),
  name: z.string().optional(),
  position: z.number().optional(),
})

export const ChecklistUpdateOutput = z.record(z.string(), z.unknown())

export const checklistUpdate = pikkuSessionlessFunc({
  description: "Checklist update",
  input: ChecklistUpdateInput,
  output: ChecklistUpdateOutput,
  func: async ({ clickup }, data) => {
    return clickup.call("PUT", "/checklist/{checklistId}", data) as any
  },
})
