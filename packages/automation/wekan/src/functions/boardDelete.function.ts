import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const BoardDeleteInput = z.object({
  boardId: z.string(),
})

export const BoardDeleteOutput = z.record(z.string(), z.unknown())

export const boardDelete = pikkuSessionlessFunc({
  description: "Delete a board",
  input: BoardDeleteInput,
  output: BoardDeleteOutput,
  func: async ({ wekan }, data) => {
    return wekan.call("DELETE", "/boards/{boardId}", data) as any
  },
})
