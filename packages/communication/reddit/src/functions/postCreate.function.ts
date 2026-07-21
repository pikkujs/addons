import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const PostCreateInput = z.object({
  title: z.string().optional(),
  sr: z.string().optional(),
  kind: z.string().optional(),
  text: z.string().optional(),
  url: z.string().optional(),
})

export const PostCreateOutput = z.record(z.string(), z.unknown())

export const postCreate = pikkuSessionlessFunc({
  description: "Create a post",
  input: PostCreateInput,
  output: PostCreateOutput,
  func: async ({ reddit }, data) => {
    return reddit.call("POST", "/api/submit", data) as any
  },
})
