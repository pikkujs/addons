import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const LabelDeleteInput = z.object({
  id: z.string(),
})

export const LabelDeleteOutput = z.record(z.string(), z.unknown())

export const labelDelete = pikkuSessionlessFunc({
  description: "Delete a label",
  input: LabelDeleteInput,
  output: LabelDeleteOutput,
  func: async ({ trello }, data) => {
    return trello.call("DELETE", "/labels/{id}", data) as any
  },
})
