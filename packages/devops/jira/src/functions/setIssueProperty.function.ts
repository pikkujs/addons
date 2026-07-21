// Issue properties — This resource represents [issue](#api-group-Issues) properties, which provides for storing custom data against an issue. Use it to get, set, and delete issue properties as well as obtain details of all properties on an issue. Operations to bulk update and delete issue properties are also provided. Issue properties are a type of [entity property](https://developer.atlassian.com/cloud/jira/platform/jira-entity-properties/).

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const SetIssuePropertyInput = z.object({
  issueIdOrKey: z.string().describe("The ID or key of the issue."),
  propertyKey: z.string().describe("The key of the issue property. The maximum length is 255 characters."),
  body: z.unknown(),
})

export const SetIssuePropertyOutput = z.unknown()

export const setIssueProperty = pikkuSessionlessFunc({
  description: "Sets the value of an issue's property. Use this resource to store custom data against an issue.\n\nThe value of the request body must be a [valid](http://tools.ietf.org/html/rfc4627), non-empty JSON blob. The maximum length is 32768 characters.\n\nThis operation can be accessed anonymously.\n\n**[Permissions](#permissions) required:**\n\n *  *Browse projects* and *Edit issues* [project permissions](https://confluence.atlassian.com/x/yodKLg) for the project containing the issue.\n *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.",
  input: SetIssuePropertyInput,
  output: SetIssuePropertyOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("PUT", "/rest/api/3/issue/{issueIdOrKey}/properties/{propertyKey}", data) as any
  },
})
