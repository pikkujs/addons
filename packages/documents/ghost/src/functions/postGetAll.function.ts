import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const PostGetAllInput = z.object({
  limit: z.number().int().optional(),
  page: z.number().int().optional(),
})

export const PostGetAllOutput = z.record(z.string(), z.unknown())

export const postGetAll = pikkuSessionlessFunc({
  description: "Get many posts",
  input: PostGetAllInput,
  output: PostGetAllOutput,
  func: async ({ ghost }, data) => {
    return ghost.call("GET", "/admin/posts", data) as any
  },
})
