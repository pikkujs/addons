// Issue links — This resource represents links between issues. Use it to get, create, and delete links between issues. To use it, the site must have [issue linking](https://confluence.atlassian.com/x/yoXKM) enabled.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, NotFoundError } from '@pikku/core/errors'

export const DeleteIssueLinkInput = z.object({
  linkId: z.string().describe("The ID of the issue link."),
})

export const deleteIssueLink = pikkuSessionlessFunc({
  description: "Deletes an issue link.\n\nThis operation can be accessed anonymously.\n\n**[Permissions](#permissions) required:**\n\n *  Browse project [project permission](https://confluence.atlassian.com/x/yodKLg) for all the projects containing the issues in the link.\n *  *Link issues* [project permission](https://confluence.atlassian.com/x/yodKLg) for at least one of the projects containing issues in the link.\n *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, permission to view both of the issues.",
  input: DeleteIssueLinkInput,
  errors: [BadRequestError, UnauthorizedError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("DELETE", "/rest/api/3/issueLink/{linkId}", data)
  },
})
