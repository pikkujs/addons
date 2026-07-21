// Issue worklog properties — This resource represents [issue worklog](#api-group-Issue-worklogs) properties, which provides for storing custom data against an issue worklog. Use it to get, create, and delete issue worklog properties as well as obtain the keys of all properties on a issue worklog. Issue worklog properties are a type of [entity property](https://developer.atlassian.com/cloud/jira/platform/jira-entity-properties/).

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, NotFoundError } from '@pikku/core/errors'

export const GetWorklogPropertyInput = z.object({
  issueIdOrKey: z.string().describe("The ID or key of the issue."),
  worklogId: z.string().describe("The ID of the worklog."),
  propertyKey: z.string().describe("The key of the property."),
})

export const GetWorklogPropertyOutput = z.object({
  key: z.string().optional().describe("The key of the property. Required on create and update."),
  value: z.unknown().optional().describe("The value of the property. Required on create and update."),
}).describe("An entity property, for more information see [Entity properties](https://developer.atlassian.com/cloud/jira/platform/jira-entity-properties/).")

export const getWorklogProperty = pikkuSessionlessFunc({
  description: "Returns the value of a worklog property.\n\nThis operation can be accessed anonymously.\n\n**[Permissions](#permissions) required:**\n\n *  *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is in.\n *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.\n *  If the worklog has visibility restrictions, belongs to the group or has the role visibility is restricted to.",
  input: GetWorklogPropertyInput,
  output: GetWorklogPropertyOutput,
  errors: [BadRequestError, UnauthorizedError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/issue/{issueIdOrKey}/worklog/{worklogId}/properties/{propertyKey}", data) as any
  },
})
