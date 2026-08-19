import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ChecklistGetInput = z.object({
  id: z.string(),
})

export const ChecklistGetOutput = z.record(z.string(), z.unknown())

export const checklistGet = pikkuSessionlessFunc({
  description: "Get a checklist",
  input: ChecklistGetInput,
  output: ChecklistGetOutput,
  func: async ({ trello }, data) => {
    return trello.call("GET", "/checklists/{id}", data) as any
  },
})
