import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CardUpdateInput = z.object({
  id: z.string(),
  name: z.string().optional(),
  desc: z.string().optional(),
  idList: z.string().optional(),
})

export const CardUpdateOutput = z.record(z.string(), z.unknown())

export const cardUpdate = pikkuSessionlessFunc({
  description: "Update a card",
  input: CardUpdateInput,
  output: CardUpdateOutput,
  func: async ({ trello }, data) => {
    return trello.call("PUT", "/cards/{id}", data) as any
  },
})
