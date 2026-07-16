import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError } from '@pikku/core/errors'

export const UtilsCommentRowInput = z.object({
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
  comment: z.string().max(3000).optional().describe("Description for the target row"),
  fk_model_id: z.string().describe("Foreign Key to Model"),
  row_id: z.string().describe("Row ID"),
})

export const UtilsCommentRowOutput = z.object({
  id: z.string().min(0).max(20).optional().describe("Unique ID"),
  row_id: z.string().optional().describe("Row ID"),
  comment: z.string().optional().describe("Comment"),
  created_by: z.string().min(0).max(20).optional().describe("Created By User ID"),
  created_by_email: z.string().optional().describe("Created By User Email"),
  resolved_by: z.string().min(0).max(20).optional().describe("Resolved By User ID"),
  resolved_by_email: z.string().optional().describe("Resolved By User Email"),
  parent_comment_id: z.string().min(0).max(20).optional().describe("Parent Comment ID"),
  source_id: z.string().min(0).max(20).optional().describe("Source ID"),
  base_id: z.string().min(0).max(20).optional().describe("Base ID"),
  fk_model_id: z.string().min(0).max(20).optional().describe("Model ID"),
  created_at: z.string().optional().describe("Created At"),
  updated_at: z.string().optional().describe("Updated At"),
  is_deleted: z.boolean().optional().describe("Whether the comment has been deleted by the user or not"),
}).describe("Model for Comment")

export const utilsCommentRow = pikkuSessionlessFunc({
  description: "Create a new comment in a row.",
  input: UtilsCommentRowInput,
  output: UtilsCommentRowOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("POST", "/api/v1/db/meta/comments", data) as any
  },
})
