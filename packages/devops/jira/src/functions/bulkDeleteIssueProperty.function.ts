// Issue properties — This resource represents [issue](#api-group-Issues) properties, which provides for storing custom data against an issue. Use it to get, set, and delete issue properties as well as obtain details of all properties on an issue. Operations to bulk update and delete issue properties are also provided. Issue properties are a type of [entity property](https://developer.atlassian.com/cloud/jira/platform/jira-entity-properties/).

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError } from '@pikku/core/errors'

export const BulkDeleteIssuePropertyInput = z.object({
  propertyKey: z.string().describe("The key of the property."),
  currentValue: z.unknown().optional().describe("The value of properties to perform the bulk operation on."),
  entityIds: z.array(z.number().int()).optional().describe("List of issues to perform the bulk delete operation on."),
})

export const bulkDeleteIssueProperty = pikkuSessionlessFunc({
  description: "Deletes a property value from multiple issues. The issues to be updated can be specified by filter criteria.\n\nThe criteria the filter used to identify eligible issues are:\n\n *  `entityIds` Only issues from this list are eligible.\n *  `currentValue` Only issues with the property set to this value are eligible.\n\nIf both criteria is specified, they are joined with the logical *AND*: only issues that satisfy both criteria are considered eligible.\n\nIf no filter criteria are specified, all the issues visible to the user and where the user has the EDIT\\_ISSUES permission for the issue are considered eligible.\n\nThis operation is:\n\n *  transactional, either the property is deleted from all eligible issues or, when errors occur, no properties are deleted.\n *  [asynchronous](#async). Follow the `location` link in the response to determine the status of the task and use [Get task](#api-rest-api-3-task-taskId-get) to obtain subsequent updates.\n\n**[Permissions](#permissions) required:**\n\n *  *Browse projects* [ project permission](https://confluence.atlassian.com/x/yodKLg) for each project containing issues.\n *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.\n *  *Edit issues* [project permission](https://confluence.atlassian.com/x/yodKLg) for each issue.",
  input: BulkDeleteIssuePropertyInput,
  errors: [BadRequestError, UnauthorizedError],
  func: async ({ jira }, data) => {
    return jira.call("DELETE", "/rest/api/3/issue/properties/{propertyKey}", data)
  },
})
