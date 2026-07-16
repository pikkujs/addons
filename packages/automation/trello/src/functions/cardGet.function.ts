import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CardGetInput = z.object({
  id: z.string(),
})

export const CardGetOutput = z.record(z.string(), z.unknown())

export const cardGet = pikkuSessionlessFunc({
  description: "Get a card",
  input: CardGetInput,
  output: CardGetOutput,
  func: async ({ trello }, data) => {
    return trello.call("GET", "/cards/{id}", data) as any
  },
})
