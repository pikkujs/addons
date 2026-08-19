import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ChecklistUpdateCheckItemInput = z.object({
  cardId: z.string(),
  checkItemId: z.string(),
  name: z.string().optional(),
  state: z.string().optional(),
})

export const ChecklistUpdateCheckItemOutput = z.record(z.string(), z.unknown())

export const checklistUpdateCheckItem = pikkuSessionlessFunc({
  description: "Update a checklist item",
  input: ChecklistUpdateCheckItemInput,
  output: ChecklistUpdateCheckItemOutput,
  func: async ({ trello }, data) => {
    return trello.call("PUT", "/cards/{cardId}/checkItem/{checkItemId}", data) as any
  },
})
