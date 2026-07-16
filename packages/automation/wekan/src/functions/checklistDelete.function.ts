import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ChecklistDeleteInput = z.object({
  boardId: z.string(),
  cardId: z.string(),
  checklistId: z.string(),
})

export const ChecklistDeleteOutput = z.record(z.string(), z.unknown())

export const checklistDelete = pikkuSessionlessFunc({
  description: "Delete a checklist",
  input: ChecklistDeleteInput,
  output: ChecklistDeleteOutput,
  func: async ({ wekan }, data) => {
    return wekan.call("DELETE", "/boards/{boardId}/cards/{cardId}/checklists/{checklistId}", data) as any
  },
})
