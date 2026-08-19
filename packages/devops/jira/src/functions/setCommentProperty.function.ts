// Issue comment properties — This resource represents [issue comment](#api-group-Issue-comments) properties, which provides for storing custom data against an issue comment. Use is to get, set, and delete issue comment properties as well as obtain the keys of all properties on a comment. Comment properties are a type of [entity property](https://developer.atlassian.com/cloud/jira/platform/jira-entity-properties/).

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const SetCommentPropertyInput = z.object({
  commentId: z.string().describe("The ID of the comment."),
  propertyKey: z.string().describe("The key of the property. The maximum length is 255 characters."),
  body: z.unknown(),
})

export const SetCommentPropertyOutput = z.unknown()

export const setCommentProperty = pikkuSessionlessFunc({
  description: "Creates or updates the value of a property for a comment. Use this resource to store custom data against a comment.\n\nThe value of the request body must be a [valid](http://tools.ietf.org/html/rfc4627), non-empty JSON blob. The maximum length is 32768 characters.\n\n**[Permissions](#permissions) required:** either of:\n\n *  *Edit All Comments* [project permission](https://confluence.atlassian.com/x/yodKLg) to create or update the value of a property on any comment.\n *  *Edit Own Comments* [project permission](https://confluence.atlassian.com/x/yodKLg) to create or update the value of a property on a comment created by the user.\n\nAlso, when the visibility of a comment is restricted to a role or group the user must be a member of that role or group.",
  input: SetCommentPropertyInput,
  output: SetCommentPropertyOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("PUT", "/rest/api/3/comment/{commentId}/properties/{propertyKey}", data) as any
  },
})
