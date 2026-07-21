import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ChecklistItemUpdateInput = z.object({
  boardId: z.string(),
  cardId: z.string(),
  checklistId: z.string(),
  itemId: z.string(),
  title: z.string().optional(),
  isFinished: z.boolean().optional(),
})

export const ChecklistItemUpdateOutput = z.record(z.string(), z.unknown())

export const checklistItemUpdate = pikkuSessionlessFunc({
  description: "Update a checklist item",
  input: ChecklistItemUpdateInput,
  output: ChecklistItemUpdateOutput,
  func: async ({ wekan }, data) => {
    return wekan.call("PUT", "/boards/{boardId}/cards/{cardId}/checklists/{checklistId}/items/{itemId}", data) as any
  },
})
