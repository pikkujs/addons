import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ListGetInput = z.object({
  listId: z.string(),
})

export const ListGetOutput = z.record(z.string(), z.unknown())

export const listGet = pikkuSessionlessFunc({
  description: "Get a list",
  input: ListGetInput,
  output: ListGetOutput,
  func: async ({ automizy }, data) => {
    return automizy.call("GET", "/smart-lists/{listId}", data) as any
  },
})
