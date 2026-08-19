// Issue comments — This resource represents issue comments. Use it to: * get, create, update, and delete a comment from an issue. * get all comments from issue. * get a list of comments by comment ID.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, NotFoundError, MethodNotAllowedError } from '@pikku/core/errors'

export const DeleteCommentInput = z.object({
  issueIdOrKey: z.string().describe("The ID or key of the issue."),
  id: z.string().describe("The ID of the comment."),
})

export const deleteComment = pikkuSessionlessFunc({
  description: "Deletes a comment.\n\n**[Permissions](#permissions) required:**\n\n *  *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue containing the comment is in.\n *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.\n *  *Delete all comments*[ project permission](https://confluence.atlassian.com/x/yodKLg) to delete any comment or *Delete own comments* to delete comment created by the user,\n *  If the comment has visibility restrictions, the user belongs to the group or has the role visibility is restricted to.",
  input: DeleteCommentInput,
  errors: [BadRequestError, UnauthorizedError, NotFoundError, MethodNotAllowedError],
  func: async ({ jira }, data) => {
    return jira.call("DELETE", "/rest/api/3/issue/{issueIdOrKey}/comment/{id}", data)
  },
})
