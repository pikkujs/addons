import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const PostDeleteInput = z.object({
  id: z.string().optional(),
})

export const PostDeleteOutput = z.record(z.string(), z.unknown())

export const postDelete = pikkuSessionlessFunc({
  description: "Delete a post",
  input: PostDeleteInput,
  output: PostDeleteOutput,
  func: async ({ reddit }, data) => {
    return reddit.call("POST", "/api/del", data) as any
  },
})
