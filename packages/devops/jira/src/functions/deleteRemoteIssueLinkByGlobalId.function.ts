// Issue remote links — This resource represents remote issue links, a way of linking Jira to information in other systems. Use it to get, create, update, and delete remote issue links either by ID or global ID. The global ID provides a way of accessing remote issue links using information about the item's remote system host and remote system identifier.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const DeleteRemoteIssueLinkByGlobalIdInput = z.object({
  issueIdOrKey: z.string().describe("The ID or key of the issue."),
  globalId: z.string().describe("The global ID of a remote issue link."),
})

export const deleteRemoteIssueLinkByGlobalId = pikkuSessionlessFunc({
  description: "Deletes the remote issue link from the issue using the link's global ID. Where the global ID includes reserved URL characters these must be escaped in the request. For example, pass `system=http://www.mycompany.com/support&id=1` as `system%3Dhttp%3A%2F%2Fwww.mycompany.com%2Fsupport%26id%3D1`.\n\nThis operation requires [issue linking to be active](https://confluence.atlassian.com/x/yoXKM).\n\nThis operation can be accessed anonymously.\n\n**[Permissions](#permissions) required:**\n\n *  *Browse projects* and *Link issues* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is in.\n *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is implemented, issue-level security permission to view the issue.",
  input: DeleteRemoteIssueLinkByGlobalIdInput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("DELETE", "/rest/api/3/issue/{issueIdOrKey}/remotelink", data)
  },
})
