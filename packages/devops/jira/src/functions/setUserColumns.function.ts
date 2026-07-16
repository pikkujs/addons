// Users — This resource represent users. Use it to: * get, get a list of, create, and delete users. * get, set, and reset a user's default issue table columns. * get a list of the groups the user belongs to. * get a list of user account IDs for a list of usernames or user keys.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnauthorizedError, ForbiddenError, NotFoundError, TooManyRequestsError, InternalServerError } from '@pikku/core/errors'

export const SetUserColumnsInput = z.object({
  accountId: z.string().max(128).optional().describe("The account ID of the user, which uniquely identifies the user across all Atlassian products. For example, *5b10ac8d82e05b22cc7d4ef5*."),
  body: z.array(z.string()),
})

export const SetUserColumnsOutput = z.unknown()

export const setUserColumns = pikkuSessionlessFunc({
  description: "Sets the default [ issue table columns](https://confluence.atlassian.com/x/XYdKLg) for the user. If an account ID is not passed, the calling user's default columns are set. If no column details are sent, then all default columns are removed.\n\nThe parameters for this resource are expressed as HTML form data. For example, in curl:\n\n`curl -X PUT -d columns=summary -d columns=description https://your-domain.atlassian.net/rest/api/3/user/columns?accountId=5b10ac8d82e05b22cc7d4ef5'`\n\n**[Permissions](#permissions) required:**\n\n *  *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg), to set the columns on any user.\n *  Permission to access Jira, to set the calling user's columns.",
  input: SetUserColumnsInput,
  output: SetUserColumnsOutput,
  errors: [UnauthorizedError, ForbiddenError, NotFoundError, TooManyRequestsError, InternalServerError],
  func: async ({ jira }, data) => {
    return jira.call("PUT", "/rest/api/3/user/columns", data) as any
  },
})
