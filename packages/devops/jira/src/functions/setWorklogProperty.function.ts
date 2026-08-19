// Issue worklog properties — This resource represents [issue worklog](#api-group-Issue-worklogs) properties, which provides for storing custom data against an issue worklog. Use it to get, create, and delete issue worklog properties as well as obtain the keys of all properties on a issue worklog. Issue worklog properties are a type of [entity property](https://developer.atlassian.com/cloud/jira/platform/jira-entity-properties/).

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const SetWorklogPropertyInput = z.object({
  issueIdOrKey: z.string().describe("The ID or key of the issue."),
  worklogId: z.string().describe("The ID of the worklog."),
  propertyKey: z.string().describe("The key of the issue property. The maximum length is 255 characters."),
  body: z.unknown(),
})

export const SetWorklogPropertyOutput = z.unknown()

export const setWorklogProperty = pikkuSessionlessFunc({
  description: "Sets the value of a worklog property. Use this operation to store custom data against the worklog.\n\nThe value of the request body must be a [valid](http://tools.ietf.org/html/rfc4627), non-empty JSON blob. The maximum length is 32768 characters.\n\nThis operation can be accessed anonymously.\n\n**[Permissions](#permissions) required:**\n\n *  *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is in.\n *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.\n *  *Edit all worklogs*[ project permission](https://confluence.atlassian.com/x/yodKLg) to update any worklog or *Edit own worklogs* to update worklogs created by the user.\n *  If the worklog has visibility restrictions, belongs to the group or has the role visibility is restricted to.",
  input: SetWorklogPropertyInput,
  output: SetWorklogPropertyOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("PUT", "/rest/api/3/issue/{issueIdOrKey}/worklog/{worklogId}/properties/{propertyKey}", data) as any
  },
})
