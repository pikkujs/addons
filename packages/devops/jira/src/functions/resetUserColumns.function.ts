// Users — This resource represent users. Use it to: * get, get a list of, create, and delete users. * get, set, and reset a user's default issue table columns. * get a list of the groups the user belongs to. * get a list of user account IDs for a list of usernames or user keys.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const ResetUserColumnsInput = z.object({
  accountId: z.string().max(128).optional().describe("The account ID of the user, which uniquely identifies the user across all Atlassian products. For example, *5b10ac8d82e05b22cc7d4ef5*."),
  username: z.string().optional().describe("This parameter is no longer available. See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details."),
})

export const resetUserColumns = pikkuSessionlessFunc({
  description: "Resets the default [ issue table columns](https://confluence.atlassian.com/x/XYdKLg) for the user to the system default. If `accountId` is not passed, the calling user's default columns are reset.\n\n**[Permissions](#permissions) required:**\n\n *  *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg), to set the columns on any user.\n *  Permission to access Jira, to set the calling user's columns.",
  input: ResetUserColumnsInput,
  errors: [UnauthorizedError, ForbiddenError],
  func: async ({ jira }, data) => {
    return jira.call("DELETE", "/rest/api/3/user/columns", data)
  },
})
