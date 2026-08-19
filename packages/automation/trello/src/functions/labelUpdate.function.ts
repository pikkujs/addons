import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const LabelUpdateInput = z.object({
  id: z.string(),
  name: z.string().optional(),
  color: z.string().optional(),
})

export const LabelUpdateOutput = z.record(z.string(), z.unknown())

export const labelUpdate = pikkuSessionlessFunc({
  description: "Update a label",
  input: LabelUpdateInput,
  output: LabelUpdateOutput,
  func: async ({ trello }, data) => {
    return trello.call("PUT", "/labels/{id}", data) as any
  },
})
