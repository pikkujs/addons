import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const PostGetInput = z.object({
  postId: z.string(),
})

export const PostGetOutput = z.record(z.string(), z.unknown())

export const postGet = pikkuSessionlessFunc({
  description: "Get a post",
  input: PostGetInput,
  output: PostGetOutput,
  func: async ({ discourse }, data) => {
    return discourse.call("GET", "/posts/{postId}", data) as any
  },
})
