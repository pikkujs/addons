import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CardDeleteInput = z.object({
  id: z.string(),
})

export const CardDeleteOutput = z.record(z.string(), z.unknown())

export const cardDelete = pikkuSessionlessFunc({
  description: "Delete a card",
  input: CardDeleteInput,
  output: CardDeleteOutput,
  func: async ({ trello }, data) => {
    return trello.call("DELETE", "/cards/{id}", data) as any
  },
})
