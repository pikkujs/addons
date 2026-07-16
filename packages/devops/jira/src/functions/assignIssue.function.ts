// Issues — This resource represents Jira issues. Use it to: * create or edit issues, individually or in bulk. * retrieve metadata about the options for creating or editing issues. * delete an issue. * assign a user to an issue. * get issue changelogs. * send notifications about an issue. * get details of the transitions available for an issue. * transition an issue.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const AssignIssueInput = z.object({
  issueIdOrKey: z.string().describe("The ID or key of the issue to be assigned."),
  accountId: z.string().max(128).optional().describe("The account ID of the user, which uniquely identifies the user across all Atlassian products. For example, *5b10ac8d82e05b22cc7d4ef5*. Required in requests."),
  key: z.string().optional().describe("This property is no longer available and will be removed from the documentation soon. See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details."),
  name: z.string().optional().describe("This property is no longer available and will be removed from the documentation soon. See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details."),
})

export const AssignIssueOutput = z.unknown()

export const assignIssue = pikkuSessionlessFunc({
  description: "Assigns an issue to a user. Use this operation when the calling user does not have the *Edit Issues* permission but has the *Assign issue* permission for the project that the issue is in.\n\nIf `name` or `accountId` is set to:\n\n *  `\"-1\"`, the issue is assigned to the default assignee for the project.\n *  `null`, the issue is set to unassigned.\n\nThis operation can be accessed anonymously.\n\n**[Permissions](#permissions) required:**\n\n *  *Browse Projects* and *Assign Issues* [ project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is in.\n *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.",
  input: AssignIssueInput,
  output: AssignIssueOutput,
  errors: [BadRequestError, ForbiddenError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("PUT", "/rest/api/3/issue/{issueIdOrKey}/assignee", data) as any
  },
})
