import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const BoardCreateInput = z.object({
  title: z.string().optional(),
  owner: z.string().optional(),
})

export const BoardCreateOutput = z.record(z.string(), z.unknown())

export const boardCreate = pikkuSessionlessFunc({
  description: "Create a board",
  input: BoardCreateInput,
  output: BoardCreateOutput,
  func: async ({ wekan }, data) => {
    return wekan.call("POST", "/boards", data) as any
  },
})
