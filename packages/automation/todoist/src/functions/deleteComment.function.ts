import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const DeleteCommentInput = z.object({
  comment_id: z.number().int().describe("The ID of the comment to delete."),
})

export const deleteComment = pikkuSessionlessFunc({
  description: "Deletes a comment.\n\nA successful response has 204 No Content status and an empty body.",
  input: DeleteCommentInput,
  func: async ({ todoist }, data) => {
    return todoist.call("DELETE", "/comments/{comment_id}", data)
  },
})
