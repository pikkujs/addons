import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ChecklistCreateInput = z.object({
  boardId: z.string(),
  cardId: z.string(),
  title: z.string().optional(),
  items: z.array(z.string()).optional(),
})

export const ChecklistCreateOutput = z.record(z.string(), z.unknown())

export const checklistCreate = pikkuSessionlessFunc({
  description: "Create a checklist",
  input: ChecklistCreateInput,
  output: ChecklistCreateOutput,
  func: async ({ wekan }, data) => {
    return wekan.call("POST", "/boards/{boardId}/cards/{cardId}/checklists", data) as any
  },
})
