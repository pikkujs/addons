// Issue properties — This resource represents [issue](#api-group-Issues) properties, which provides for storing custom data against an issue. Use it to get, set, and delete issue properties as well as obtain details of all properties on an issue. Operations to bulk update and delete issue properties are also provided. Issue properties are a type of [entity property](https://developer.atlassian.com/cloud/jira/platform/jira-entity-properties/).

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError } from '@pikku/core/errors'

export const BulkSetIssuePropertyInput = z.object({
  propertyKey: z.string().describe("The key of the property. The maximum length is 255 characters."),
  expression: z.string().optional().describe("EXPERIMENTAL. The Jira expression to calculate the value of the property. The value of the expression must be an object that can be converted to JSON, such as a number, boolean, string, list, or map. The context variables available to the expression are `issue` and `user`. Issues for which the expression returns a value whose JSON representation is longer than 32768 characters are ignored."),
  filter: z.object({
  currentValue: z.unknown().optional().describe("The value of properties to perform the bulk operation on."),
  entityIds: z.array(z.number().int()).optional().describe("List of issues to perform the bulk operation on."),
  hasProperty: z.boolean().optional().describe("Whether the bulk operation occurs only when the property is present on or absent from an issue."),
}).optional().describe("The bulk operation filter."),
  value: z.unknown().optional().describe("The value of the property. The value must be a [valid](https://tools.ietf.org/html/rfc4627), non-empty JSON blob. The maximum length is 32768 characters."),
})

export const bulkSetIssueProperty = pikkuSessionlessFunc({
  description: "Sets a property value on multiple issues.\n\nThe value set can be a constant or determined by a [Jira expression](https://developer.atlassian.com/cloud/jira/platform/jira-expressions/). Expressions must be computable with constant complexity when applied to a set of issues. Expressions must also comply with the [restrictions](https://developer.atlassian.com/cloud/jira/platform/jira-expressions/#restrictions) that apply to all Jira expressions.\n\nThe issues to be updated can be specified by a filter.\n\nThe filter identifies issues eligible for update using these criteria:\n\n *  `entityIds` Only issues from this list are eligible.\n *  `currentValue` Only issues with the property set to this value are eligible.\n *  `hasProperty`:\n    \n     *  If *true*, only issues with the property are eligible.\n     *  If *false*, only issues without the property are eligible.\n\nIf more than one criteria is specified, they are joined with the logical *AND*: only issues that satisfy all criteria are eligible.\n\nIf an invalid combination of criteria is provided, an error is returned. For example, specifying a `currentValue` and `hasProperty` as *false* would not match any issues (because without the property the property cannot have a value).\n\nThe filter is optional. Without the filter all the issues visible to the user and where the user has the EDIT\\_ISSUES permission for the issue are considered eligible.\n\nThis operation is:\n\n *  transactional, either all eligible issues are updated or, when errors occur, none are updated.\n *  [asynchronous](#async). Follow the `location` link in the response to determine the status of the task and use [Get task](#api-rest-api-3-task-taskId-get) to obtain subsequent updates.\n\n**[Permissions](#permissions) required:**\n\n *  *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for each project containing issues.\n *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.\n *  *Edit issues* [project permission](https://confluence.atlassian.com/x/yodKLg) for each issue.",
  input: BulkSetIssuePropertyInput,
  errors: [BadRequestError, UnauthorizedError],
  func: async ({ jira }, data) => {
    return jira.call("PUT", "/rest/api/3/issue/properties/{propertyKey}", data)
  },
})
