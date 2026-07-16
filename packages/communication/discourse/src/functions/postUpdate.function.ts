import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const PostUpdateInput = z.object({
  postId: z.string(),
  raw: z.string().optional(),
})

export const PostUpdateOutput = z.record(z.string(), z.unknown())

export const postUpdate = pikkuSessionlessFunc({
  description: "Update a post",
  input: PostUpdateInput,
  output: PostUpdateOutput,
  func: async ({ discourse }, data) => {
    return discourse.call("PUT", "/posts/{postId}.json", data) as any
  },
})
