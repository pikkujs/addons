import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ChecklistGetAllInput = z.object({
  boardId: z.string(),
  cardId: z.string(),
})

export const ChecklistGetAllOutput = z.record(z.string(), z.unknown())

export const checklistGetAll = pikkuSessionlessFunc({
  description: "Get all checklists on a card",
  input: ChecklistGetAllInput,
  output: ChecklistGetAllOutput,
  func: async ({ wekan }, data) => {
    return wekan.call("GET", "/boards/{boardId}/cards/{cardId}/checklists", data) as any
  },
})
