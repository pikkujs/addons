// Issue worklog properties — This resource represents [issue worklog](#api-group-Issue-worklogs) properties, which provides for storing custom data against an issue worklog. Use it to get, create, and delete issue worklog properties as well as obtain the keys of all properties on a issue worklog. Issue worklog properties are a type of [entity property](https://developer.atlassian.com/cloud/jira/platform/jira-entity-properties/).

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const DeleteWorklogPropertyInput = z.object({
  issueIdOrKey: z.string().describe("The ID or key of the issue."),
  worklogId: z.string().describe("The ID of the worklog."),
  propertyKey: z.string().describe("The key of the property."),
})

export const deleteWorklogProperty = pikkuSessionlessFunc({
  description: "Deletes a worklog property.\n\nThis operation can be accessed anonymously.\n\n**[Permissions](#permissions) required:**\n\n *  *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is in.\n *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.\n *  If the worklog has visibility restrictions, belongs to the group or has the role visibility is restricted to.",
  input: DeleteWorklogPropertyInput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("DELETE", "/rest/api/3/issue/{issueIdOrKey}/worklog/{worklogId}/properties/{propertyKey}", data)
  },
})
