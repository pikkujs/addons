import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const PostDeleteInput = z.object({
  postId: z.string(),
})

export const PostDeleteOutput = z.record(z.string(), z.unknown())

export const postDelete = pikkuSessionlessFunc({
  description: "Delete a post",
  input: PostDeleteInput,
  output: PostDeleteOutput,
  func: async ({ ghost }, data) => {
    return ghost.call("DELETE", "/admin/posts/{postId}", data) as any
  },
})
