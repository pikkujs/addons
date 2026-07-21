import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const BoardGetInput = z.object({
  id: z.string(),
})

export const BoardGetOutput = z.record(z.string(), z.unknown())

export const boardGet = pikkuSessionlessFunc({
  description: "Get a board",
  input: BoardGetInput,
  output: BoardGetOutput,
  func: async ({ trello }, data) => {
    return trello.call("GET", "/boards/{id}", data) as any
  },
})
