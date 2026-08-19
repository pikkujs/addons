// Issue worklogs — This resource represents issue worklogs. Use it to: * get, create, update, and delete worklogs. * obtain lists of updated or deleted worklogs.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, NotFoundError } from '@pikku/core/errors'

export const DeleteWorklogInput = z.object({
  issueIdOrKey: z.string().describe("The ID or key of the issue."),
  id: z.string().describe("The ID of the worklog."),
  notifyUsers: z.boolean().optional().default(true).describe("Whether users watching the issue are notified by email."),
  adjustEstimate: z.enum(["new", "leave", "manual", "auto"]).optional().default("auto").describe("Defines how to update the issue's time estimate, the options are:\n\n *  `new` Sets the estimate to a specific value, defined in `newEstimate`.\n *  `leave` Leaves the estimate unchanged.\n *  `manual` Increases the estimate by amount specified in `increaseBy`.\n *  `auto` Reduces the estimate by the value of `timeSpent` in the worklog."),
  newEstimate: z.string().optional().describe("The value to set as the issue's remaining time estimate, as days (\\#d), hours (\\#h), or minutes (\\#m or \\#). For example, *2d*. Required when `adjustEstimate` is `new`."),
  increaseBy: z.string().optional().describe("The amount to increase the issue's remaining estimate by, as days (\\#d), hours (\\#h), or minutes (\\#m or \\#). For example, *2d*. Required when `adjustEstimate` is `manual`."),
  overrideEditableFlag: z.boolean().optional().default(false).describe("Whether the work log entry should be added to the issue even if the issue is not editable, because jira.issue.editable set to false or missing. For example, the issue is closed. Connect and Forge app users with admin permission can use this flag."),
})

export const deleteWorklog = pikkuSessionlessFunc({
  description: "Deletes a worklog from an issue.\n\nTime tracking must be enabled in Jira, otherwise this operation returns an error. For more information, see [Configuring time tracking](https://confluence.atlassian.com/x/qoXKM).\n\nThis operation can be accessed anonymously.\n\n**[Permissions](#permissions) required:**\n\n *  *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is in.\n *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.\n *  *Delete all worklogs*[ project permission](https://confluence.atlassian.com/x/yodKLg) to delete any worklog or *Delete own worklogs* to delete worklogs created by the user,\n *  If the worklog has visibility restrictions, belongs to the group or has the role visibility is restricted to.",
  input: DeleteWorklogInput,
  errors: [BadRequestError, UnauthorizedError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("DELETE", "/rest/api/3/issue/{issueIdOrKey}/worklog/{id}", data)
  },
})
