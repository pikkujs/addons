import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ChecklistGetAllInput = z.object({
  cardId: z.string(),
})

export const ChecklistGetAllOutput = z.record(z.string(), z.unknown())

export const checklistGetAll = pikkuSessionlessFunc({
  description: "Get many checklists",
  input: ChecklistGetAllInput,
  output: ChecklistGetAllOutput,
  func: async ({ trello }, data) => {
    return trello.call("GET", "/cards/{cardId}/checklists", data) as any
  },
})
