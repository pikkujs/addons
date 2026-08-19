import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ChecklistCreateInput = z.object({
  cardId: z.string(),
  name: z.string().optional(),
})

export const ChecklistCreateOutput = z.record(z.string(), z.unknown())

export const checklistCreate = pikkuSessionlessFunc({
  description: "Create a checklist",
  input: ChecklistCreateInput,
  output: ChecklistCreateOutput,
  func: async ({ trello }, data) => {
    return trello.call("POST", "/cards/{cardId}/checklists", data) as any
  },
})
