// Issue comment properties — This resource represents [issue comment](#api-group-Issue-comments) properties, which provides for storing custom data against an issue comment. Use is to get, set, and delete issue comment properties as well as obtain the keys of all properties on a comment. Comment properties are a type of [entity property](https://developer.atlassian.com/cloud/jira/platform/jira-entity-properties/).

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const GetCommentPropertyInput = z.object({
  commentId: z.string().describe("The ID of the comment."),
  propertyKey: z.string().describe("The key of the property."),
})

export const GetCommentPropertyOutput = z.object({
  key: z.string().optional().describe("The key of the property. Required on create and update."),
  value: z.unknown().optional().describe("The value of the property. Required on create and update."),
}).describe("An entity property, for more information see [Entity properties](https://developer.atlassian.com/cloud/jira/platform/jira-entity-properties/).")

export const getCommentProperty = pikkuSessionlessFunc({
  description: "Returns the value of a comment property.\n\nThis operation can be accessed anonymously.\n\n**[Permissions](#permissions) required:**\n\n *  *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.\n *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.\n *  If the comment has visibility restrictions, belongs to the group or has the role visibility is restricted to.",
  input: GetCommentPropertyInput,
  output: GetCommentPropertyOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/comment/{commentId}/properties/{propertyKey}", data) as any
  },
})
