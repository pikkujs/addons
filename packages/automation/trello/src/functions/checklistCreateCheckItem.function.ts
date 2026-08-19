import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ChecklistCreateCheckItemInput = z.object({
  checklistId: z.string(),
  name: z.string().optional(),
})

export const ChecklistCreateCheckItemOutput = z.record(z.string(), z.unknown())

export const checklistCreateCheckItem = pikkuSessionlessFunc({
  description: "Create checklist item",
  input: ChecklistCreateCheckItemInput,
  output: ChecklistCreateCheckItemOutput,
  func: async ({ trello }, data) => {
    return trello.call("POST", "/checklists/{checklistId}/checkItems", data) as any
  },
})
