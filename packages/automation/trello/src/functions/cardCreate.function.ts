import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CardCreateInput = z.object({
  idList: z.string().optional(),
  name: z.string().optional(),
  desc: z.string().optional(),
})

export const CardCreateOutput = z.record(z.string(), z.unknown())

export const cardCreate = pikkuSessionlessFunc({
  description: "Create a card",
  input: CardCreateInput,
  output: CardCreateOutput,
  func: async ({ trello }, data) => {
    return trello.call("POST", "/cards", data) as any
  },
})
