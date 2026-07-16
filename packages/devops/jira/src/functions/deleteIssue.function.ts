// Issues — This resource represents Jira issues. Use it to: * create or edit issues, individually or in bulk. * retrieve metadata about the options for creating or editing issues. * delete an issue. * assign a user to an issue. * get issue changelogs. * send notifications about an issue. * get details of the transitions available for an issue. * transition an issue.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const DeleteIssueInput = z.object({
  issueIdOrKey: z.string().describe("The ID or key of the issue."),
  deleteSubtasks: z.enum(["true", "false"]).optional().default("false").describe("Whether the issue's subtasks are deleted when the issue is deleted."),
})

export const deleteIssue = pikkuSessionlessFunc({
  description: "Deletes an issue.\n\nAn issue cannot be deleted if it has one or more subtasks. To delete an issue with subtasks, set `deleteSubtasks`. This causes the issue's subtasks to be deleted with the issue.\n\nThis operation can be accessed anonymously.\n\n**[Permissions](#permissions) required:**\n\n *  *Browse projects* and *Delete issues* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project containing the issue.\n *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.",
  input: DeleteIssueInput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("DELETE", "/rest/api/3/issue/{issueIdOrKey}", data)
  },
})
