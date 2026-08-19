import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const PostDeleteInput = z.object({
  workspaceId: z.string(),
  memberId: z.string(),
  postId: z.string(),
})

export const PostDeleteOutput = z.record(z.string(), z.unknown())

export const postDelete = pikkuSessionlessFunc({
  description: "Delete a post",
  input: PostDeleteInput,
  output: PostDeleteOutput,
  func: async ({ orbit }, data) => {
    return orbit.call("DELETE", "/{workspaceId}/members/{memberId}/posts/{postId}", data) as any
  },
})
