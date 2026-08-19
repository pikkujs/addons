import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const TagGetAllOutput = z.record(z.string(), z.unknown())

export const tagGetAll = pikkuSessionlessFunc({
  description: "Get all tags",
  output: TagGetAllOutput,
  func: async ({ raindrop }) => {
    return raindrop.call("GET", "/tags") as any
  },
})
