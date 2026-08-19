import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ChecklistItemGetInput = z.object({
  boardId: z.string(),
  cardId: z.string(),
  checklistId: z.string(),
  itemId: z.string(),
})

export const ChecklistItemGetOutput = z.record(z.string(), z.unknown())

export const checklistItemGet = pikkuSessionlessFunc({
  description: "Get a checklist item",
  input: ChecklistItemGetInput,
  output: ChecklistItemGetOutput,
  func: async ({ wekan }, data) => {
    return wekan.call("GET", "/boards/{boardId}/cards/{cardId}/checklists/{checklistId}/items/{itemId}", data) as any
  },
})
