import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const LabelAddLabelInput = z.object({
  cardId: z.string(),
  value: z.string().optional(),
})

export const LabelAddLabelOutput = z.record(z.string(), z.unknown())

export const labelAddLabel = pikkuSessionlessFunc({
  description: "Add a label to a card",
  input: LabelAddLabelInput,
  output: LabelAddLabelOutput,
  func: async ({ trello }, data) => {
    return trello.call("POST", "/cards/{cardId}/idLabels", data) as any
  },
})
