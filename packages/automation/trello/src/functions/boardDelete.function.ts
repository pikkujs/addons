import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const BoardDeleteInput = z.object({
  id: z.string(),
})

export const BoardDeleteOutput = z.record(z.string(), z.unknown())

export const boardDelete = pikkuSessionlessFunc({
  description: "Delete a board",
  input: BoardDeleteInput,
  output: BoardDeleteOutput,
  func: async ({ trello }, data) => {
    return trello.call("DELETE", "/boards/{id}", data) as any
  },
})
