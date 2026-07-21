import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UtilsCommentDeleteInput = z.object({
  commentId: z.string().describe("Comment ID"),
  "xc-auth": z.string().optional().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
})

export const UtilsCommentDeleteOutput = z.number()

export const utilsCommentDelete = pikkuSessionlessFunc({
  description: "Delete comment",
  input: UtilsCommentDeleteInput,
  output: UtilsCommentDeleteOutput,
  func: async ({ nocodb }, data) => {
    return nocodb.call("DELETE", "/api/v1/db/meta/comment/{commentId}/", data) as any
  },
})
