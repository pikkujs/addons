import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const LabelRemoveLabelInput = z.object({
  cardId: z.string(),
  id: z.string(),
})

export const LabelRemoveLabelOutput = z.record(z.string(), z.unknown())

export const labelRemoveLabel = pikkuSessionlessFunc({
  description: "Remove a label from a card",
  input: LabelRemoveLabelInput,
  output: LabelRemoveLabelOutput,
  func: async ({ trello }, data) => {
    return trello.call("DELETE", "/cards/{cardId}/idLabels/{id}", data) as any
  },
})
