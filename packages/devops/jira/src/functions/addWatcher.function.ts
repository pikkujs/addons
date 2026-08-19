// Issue watchers — This resource represents users watching an issue. Use it to get details of users watching an issue as well as start and stop a user watching an issue.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const AddWatcherInput = z.object({
  issueIdOrKey: z.string().describe("The ID or key of the issue."),
  body: z.string(),
})

export const AddWatcherOutput = z.unknown()

export const addWatcher = pikkuSessionlessFunc({
  description: "Adds a user as a watcher of an issue by passing the account ID of the user. For example, `\"5b10ac8d82e05b22cc7d4ef5\"`. If no user is specified the calling user is added.\n\nThis operation requires the **Allow users to watch issues** option to be *ON*. This option is set in General configuration for Jira. See [Configuring Jira application options](https://confluence.atlassian.com/x/uYXKM) for details.\n\n**[Permissions](#permissions) required:**\n\n *  *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is in.\n *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.\n *  To add users other than themselves to the watchlist, *Manage watcher list* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is in.",
  input: AddWatcherInput,
  output: AddWatcherOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("POST", "/rest/api/3/issue/{issueIdOrKey}/watchers", data) as any
  },
})
