import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const TagGetAllOutput = z.record(z.string(), z.unknown())

export const tagGetAll = pikkuSessionlessFunc({
  description: "TagGetAll",
  output: TagGetAllOutput,
  func: async ({ convertkit }) => {
    return convertkit.call("GET", "/tags") as any
  },
})
