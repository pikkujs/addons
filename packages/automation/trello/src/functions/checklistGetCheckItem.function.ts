import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ChecklistGetCheckItemInput = z.object({
  cardId: z.string(),
  checkItemId: z.string(),
})

export const ChecklistGetCheckItemOutput = z.record(z.string(), z.unknown())

export const checklistGetCheckItem = pikkuSessionlessFunc({
  description: "Get checklist items",
  input: ChecklistGetCheckItemInput,
  output: ChecklistGetCheckItemOutput,
  func: async ({ trello }, data) => {
    return trello.call("GET", "/cards/{cardId}/checkItem/{checkItemId}", data) as any
  },
})
