import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const PostGetAllInput = z.object({
  workspaceId: z.string(),
  member_id: z.string().optional(),
  page: z.number().optional(),
})

export const PostGetAllOutput = z.record(z.string(), z.unknown())

export const postGetAll = pikkuSessionlessFunc({
  description: "Get many posts",
  input: PostGetAllInput,
  output: PostGetAllOutput,
  func: async ({ orbit }, data) => {
    return orbit.call("GET", "/{workspaceId}/posts", data) as any
  },
})
