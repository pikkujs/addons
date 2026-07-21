import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const PostCreateInput = z.object({
  workspaceId: z.string(),
  memberId: z.string(),
  url: z.string().optional(),
  published_at: z.string().optional(),
})

export const PostCreateOutput = z.record(z.string(), z.unknown())

export const postCreate = pikkuSessionlessFunc({
  description: "Create a post",
  input: PostCreateInput,
  output: PostCreateOutput,
  func: async ({ orbit }, data) => {
    return orbit.call("POST", "/{workspaceId}/members/{memberId}/posts", data) as any
  },
})
