import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ListCreateInput = z.object({
  name: z.string().optional(),
  idBoard: z.string().optional(),
})

export const ListCreateOutput = z.record(z.string(), z.unknown())

export const listCreate = pikkuSessionlessFunc({
  description: "Create a list",
  input: ListCreateInput,
  output: ListCreateOutput,
  func: async ({ trello }, data) => {
    return trello.call("POST", "/lists", data) as any
  },
})
