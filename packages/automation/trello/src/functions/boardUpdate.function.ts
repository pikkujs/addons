import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const BoardUpdateInput = z.object({
  id: z.string(),
  name: z.string().optional(),
  desc: z.string().optional(),
})

export const BoardUpdateOutput = z.record(z.string(), z.unknown())

export const boardUpdate = pikkuSessionlessFunc({
  description: "Update a board",
  input: BoardUpdateInput,
  output: BoardUpdateOutput,
  func: async ({ trello }, data) => {
    return trello.call("PUT", "/boards/{id}", data) as any
  },
})
