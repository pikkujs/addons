import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ListGetAllInput = z.object({
  limit: z.number().int().optional(),
})

export const ListGetAllOutput = z.record(z.string(), z.unknown())

export const listGetAll = pikkuSessionlessFunc({
  description: "Get all lists",
  input: ListGetAllInput,
  output: ListGetAllOutput,
  func: async ({ automizy }, data) => {
    return automizy.call("GET", "/smart-lists", data) as any
  },
})
