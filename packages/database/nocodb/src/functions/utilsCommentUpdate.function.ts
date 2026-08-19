import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UtilsCommentUpdateInput = z.object({
  commentId: z.string().describe("Comment ID"),
  "xc-auth": z.string().optional().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
  comment: z.string().max(3000).optional().describe("Description for the target row"),
  fk_model_id: z.string().optional().describe("Foreign Key to Model"),
})

export const UtilsCommentUpdateOutput = z.number()

export const utilsCommentUpdate = pikkuSessionlessFunc({
  description: "Update comment",
  input: UtilsCommentUpdateInput,
  output: UtilsCommentUpdateOutput,
  func: async ({ nocodb }, data) => {
    return nocodb.call("PATCH", "/api/v1/db/meta/comment/{commentId}/", data) as any
  },
})
