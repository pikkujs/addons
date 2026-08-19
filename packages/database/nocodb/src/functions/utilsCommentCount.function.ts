import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'

export const UtilsCommentCountInput = z.object({
  ids: z.string().describe("Comment IDs"),
  fk_model_id: z.string().min(0).max(20).describe("Model for ID").describe("Foreign Key to Model"),
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
})

export const UtilsCommentCountOutput = z.array(z.object({
  count: z.string().describe("The number of comments"),
  row_id: z.string().describe("Row ID"),
}))

export const utilsCommentCount = pikkuSessionlessFunc({
  description: "Return the number of comments in the given query.",
  input: UtilsCommentCountInput,
  output: UtilsCommentCountOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("GET", "/api/v1/db/meta/comments/count", data) as any
  },
})
