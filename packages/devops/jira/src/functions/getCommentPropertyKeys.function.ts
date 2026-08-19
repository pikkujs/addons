// Issue comment properties — This resource represents [issue comment](#api-group-Issue-comments) properties, which provides for storing custom data against an issue comment. Use is to get, set, and delete issue comment properties as well as obtain the keys of all properties on a comment. Comment properties are a type of [entity property](https://developer.atlassian.com/cloud/jira/platform/jira-entity-properties/).

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const GetCommentPropertyKeysInput = z.object({
  commentId: z.string().describe("The ID of the comment."),
})

export const GetCommentPropertyKeysOutput = z.object({
  keys: z.array(z.object({
    key: z.string().optional().describe("The key of the property."),
    self: z.string().optional().describe("The URL of the property."),
  })).optional().describe("Property key details."),
}).describe("List of property keys.")

export const getCommentPropertyKeys = pikkuSessionlessFunc({
  description: "Returns the keys of all the properties of a comment.\n\nThis operation can be accessed anonymously.\n\n**[Permissions](#permissions) required:**\n\n *  *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.\n *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.\n *  If the comment has visibility restrictions, belongs to the group or has the role visibility is restricted to.",
  input: GetCommentPropertyKeysInput,
  output: GetCommentPropertyKeysOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/comment/{commentId}/properties", data) as any
  },
})
