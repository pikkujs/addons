import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ChecklistCompletedCheckItemsInput = z.object({
  cardId: z.string(),
})

export const ChecklistCompletedCheckItemsOutput = z.record(z.string(), z.unknown())

export const checklistCompletedCheckItems = pikkuSessionlessFunc({
  description: "Get completed checklist items",
  input: ChecklistCompletedCheckItemsInput,
  output: ChecklistCompletedCheckItemsOutput,
  func: async ({ trello }, data) => {
    return trello.call("GET", "/cards/{cardId}/checkItemStates", data) as any
  },
})
