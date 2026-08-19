import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const PostUpdateInput = z.object({
  postId: z.string(),
  title: z.string().optional(),
  html: z.string().optional(),
  status: z.string().optional(),
})

export const PostUpdateOutput = z.record(z.string(), z.unknown())

export const postUpdate = pikkuSessionlessFunc({
  description: "Update a post",
  input: PostUpdateInput,
  output: PostUpdateOutput,
  func: async ({ ghost }, data) => {
    return ghost.call("PUT", "/admin/posts/{postId}", data) as any
  },
})
