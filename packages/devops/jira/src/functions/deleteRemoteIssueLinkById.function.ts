// Issue remote links — This resource represents remote issue links, a way of linking Jira to information in other systems. Use it to get, create, update, and delete remote issue links either by ID or global ID. The global ID provides a way of accessing remote issue links using information about the item's remote system host and remote system identifier.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const DeleteRemoteIssueLinkByIdInput = z.object({
  issueIdOrKey: z.string().describe("The ID or key of the issue."),
  linkId: z.string().describe("The ID of a remote issue link."),
})

export const deleteRemoteIssueLinkById = pikkuSessionlessFunc({
  description: "Deletes a remote issue link from an issue.\n\nThis operation requires [issue linking to be active](https://confluence.atlassian.com/x/yoXKM).\n\nThis operation can be accessed anonymously.\n\n**[Permissions](#permissions) required:**\n\n *  *Browse projects*, *Edit issues*, and *Link issues* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is in.\n *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.",
  input: DeleteRemoteIssueLinkByIdInput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("DELETE", "/rest/api/3/issue/{issueIdOrKey}/remotelink/{linkId}", data)
  },
})
