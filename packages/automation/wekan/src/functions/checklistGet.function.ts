import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ChecklistGetInput = z.object({
  boardId: z.string(),
  cardId: z.string(),
  checklistId: z.string(),
})

export const ChecklistGetOutput = z.record(z.string(), z.unknown())

export const checklistGet = pikkuSessionlessFunc({
  description: "Get a checklist",
  input: ChecklistGetInput,
  output: ChecklistGetOutput,
  func: async ({ wekan }, data) => {
    return wekan.call("GET", "/boards/{boardId}/cards/{cardId}/checklists/{checklistId}", data) as any
  },
})
