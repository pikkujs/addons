import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const BoardCreateInput = z.object({
  name: z.string().optional(),
  desc: z.string().optional(),
})

export const BoardCreateOutput = z.record(z.string(), z.unknown())

export const boardCreate = pikkuSessionlessFunc({
  description: "Create a board",
  input: BoardCreateInput,
  output: BoardCreateOutput,
  func: async ({ trello }, data) => {
    return trello.call("POST", "/boards", data) as any
  },
})
