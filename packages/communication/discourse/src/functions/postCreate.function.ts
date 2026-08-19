import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const PostCreateInput = z.object({
  title: z.string().optional(),
  raw: z.string().optional(),
})

export const PostCreateOutput = z.record(z.string(), z.unknown())

export const postCreate = pikkuSessionlessFunc({
  description: "Create a post",
  input: PostCreateInput,
  output: PostCreateOutput,
  func: async ({ discourse }, data) => {
    return discourse.call("POST", "/posts.json", data) as any
  },
})
