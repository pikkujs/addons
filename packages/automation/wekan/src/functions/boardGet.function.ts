import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const BoardGetInput = z.object({
  boardId: z.string(),
})

export const BoardGetOutput = z.record(z.string(), z.unknown())

export const boardGet = pikkuSessionlessFunc({
  description: "Get a board",
  input: BoardGetInput,
  output: BoardGetOutput,
  func: async ({ wekan }, data) => {
    return wekan.call("GET", "/boards/{boardId}", data) as any
  },
})
