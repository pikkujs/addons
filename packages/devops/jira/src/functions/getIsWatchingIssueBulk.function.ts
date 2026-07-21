// Issue watchers — This resource represents users watching an issue. Use it to get details of users watching an issue as well as start and stop a user watching an issue.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnauthorizedError } from '@pikku/core/errors'

export const GetIsWatchingIssueBulkInput = z.object({
  issueIds: z.array(z.string()).describe("The list of issue IDs."),
})

export const GetIsWatchingIssueBulkOutput = z.object({
  issuesIsWatching: z.record(z.string(), z.boolean()).optional().describe("The map of issue ID to boolean watch status."),
}).describe("A container for the watch status of a list of issues.")

export const getIsWatchingIssueBulk = pikkuSessionlessFunc({
  description: "Returns, for the user, details of the watched status of issues from a list. If an issue ID is invalid, the returned watched status is `false`.\n\nThis operation requires the **Allow users to watch issues** option to be *ON*. This option is set in General configuration for Jira. See [Configuring Jira application options](https://confluence.atlassian.com/x/uYXKM) for details.\n\n**[Permissions](#permissions) required:**\n\n *  *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is in\n *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.",
  input: GetIsWatchingIssueBulkInput,
  output: GetIsWatchingIssueBulkOutput,
  errors: [UnauthorizedError],
  func: async ({ jira }, data) => {
    return jira.call("POST", "/rest/api/3/issue/watching", data) as any
  },
})
