import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const LabelCreateInput = z.object({
  name: z.string().optional(),
  color: z.string().optional(),
  idBoard: z.string().optional(),
})

export const LabelCreateOutput = z.record(z.string(), z.unknown())

export const labelCreate = pikkuSessionlessFunc({
  description: "Create a label",
  input: LabelCreateInput,
  output: LabelCreateOutput,
  func: async ({ trello }, data) => {
    return trello.call("POST", "/labels", data) as any
  },
})
