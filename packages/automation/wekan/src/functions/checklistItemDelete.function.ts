import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ChecklistItemDeleteInput = z.object({
  boardId: z.string(),
  cardId: z.string(),
  checklistId: z.string(),
  itemId: z.string(),
})

export const ChecklistItemDeleteOutput = z.record(z.string(), z.unknown())

export const checklistItemDelete = pikkuSessionlessFunc({
  description: "Delete a checklist item",
  input: ChecklistItemDeleteInput,
  output: ChecklistItemDeleteOutput,
  func: async ({ wekan }, data) => {
    return wekan.call("DELETE", "/boards/{boardId}/cards/{cardId}/checklists/{checklistId}/items/{itemId}", data) as any
  },
})
