import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const PostCreateInput = z.object({
  title: z.string().optional(),
  html: z.string().optional(),
  status: z.string().optional(),
  slug: z.string().optional(),
})

export const PostCreateOutput = z.record(z.string(), z.unknown())

export const postCreate = pikkuSessionlessFunc({
  description: "Create a post",
  input: PostCreateInput,
  output: PostCreateOutput,
  func: async ({ ghost }, data) => {
    return ghost.call("POST", "/admin/posts", data) as any
  },
})
