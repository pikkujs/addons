import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ChecklistDeleteInput = z.object({
  cardId: z.string(),
  id: z.string(),
})

export const ChecklistDeleteOutput = z.record(z.string(), z.unknown())

export const checklistDelete = pikkuSessionlessFunc({
  description: "Delete a checklist",
  input: ChecklistDeleteInput,
  output: ChecklistDeleteOutput,
  func: async ({ trello }, data) => {
    return trello.call("DELETE", "/cards/{cardId}/checklists/{id}", data) as any
  },
})
