import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ListGetCardsInput = z.object({
  id: z.string(),
})

export const ListGetCardsOutput = z.record(z.string(), z.unknown())

export const listGetCards = pikkuSessionlessFunc({
  description: "Get all cards in a list",
  input: ListGetCardsInput,
  output: ListGetCardsOutput,
  func: async ({ trello }, data) => {
    return trello.call("GET", "/lists/{id}/cards", data) as any
  },
})
