import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ListGetInput = z.object({
  id: z.string(),
})

export const ListGetOutput = z.record(z.string(), z.unknown())

export const listGet = pikkuSessionlessFunc({
  description: "Get a list",
  input: ListGetInput,
  output: ListGetOutput,
  func: async ({ trello }, data) => {
    return trello.call("GET", "/lists/{id}", data) as any
  },
})
