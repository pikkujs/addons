import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const PostGetAllOutput = z.record(z.string(), z.unknown())

export const postGetAll = pikkuSessionlessFunc({
  description: "Get all posts",
  output: PostGetAllOutput,
  func: async ({ discourse }) => {
    return discourse.call("GET", "/posts.json") as any
  },
})
