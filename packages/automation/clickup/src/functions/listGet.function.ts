import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ListGetInput = z.object({
  listId: z.string(),
})

export const ListGetOutput = z.record(z.string(), z.unknown())

export const listGet = pikkuSessionlessFunc({
  description: "List get",
  input: ListGetInput,
  output: ListGetOutput,
  func: async ({ clickup }, data) => {
    return clickup.call("GET", "/list/{listId}", data) as any
  },
})
