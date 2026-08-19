import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ChecklistDeleteCheckItemInput = z.object({
  cardId: z.string(),
  checkItemId: z.string(),
})

export const ChecklistDeleteCheckItemOutput = z.record(z.string(), z.unknown())

export const checklistDeleteCheckItem = pikkuSessionlessFunc({
  description: "Delete a checklist item",
  input: ChecklistDeleteCheckItemInput,
  output: ChecklistDeleteCheckItemOutput,
  func: async ({ trello }, data) => {
    return trello.call("DELETE", "/cards/{cardId}/checkItem/{checkItemId}", data) as any
  },
})
