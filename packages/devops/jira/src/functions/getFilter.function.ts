// Filters — This resource represents [filters](https://confluence.atlassian.com/x/eQiiLQ). Use it to get, create, update, or delete filters. Also use it to configure the columns for a filter and set favorite filters.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError } from '@pikku/core/errors'

export const GetFilterInput = z.object({
  id: z.number().int().describe("The ID of the filter to return."),
  expand: z.string().optional().describe("Use [expand](#expansion) to include additional information about filter in the response. This parameter accepts a comma-separated list. Expand options include:\n\n *  `sharedUsers` Returns the users that the filter is shared with. This includes users that can browse projects that the filter is shared with. If you don't specify `sharedUsers`, then the `sharedUsers` object is returned but it doesn't list any users. The list of users returned is limited to 1000, to access additional users append `[start-index:end-index]` to the expand request. For example, to access the next 1000 users, use `?expand=sharedUsers[1001:2000]`.\n *  `subscriptions` Returns the users that are subscribed to the filter. If you don't specify `subscriptions`, the `subscriptions` object is returned but it doesn't list any subscriptions. The list of subscriptions returned is limited to 1000, to access additional subscriptions append `[start-index:end-index]` to the expand request. For example, to access the next 1000 subscriptions, use `?expand=subscriptions[1001:2000]`."),
  overrideSharePermissions: z.boolean().optional().default(false).describe("EXPERIMENTAL: Whether share permissions are overridden to enable filters with any share permissions to be returned. Available to users with *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg)."),
})

export const GetFilterOutput = z.any()

export const getFilter = pikkuSessionlessFunc({
  description: "Returns a filter.\n\nThis operation can be accessed anonymously.\n\n**[Permissions](#permissions) required:** None, however, the filter is only returned where it is:\n\n *  owned by the user.\n *  shared with a group that the user is a member of.\n *  shared with a private project that the user has *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for.\n *  shared with a public project.\n *  shared with the public.",
  input: GetFilterInput,
  output: GetFilterOutput,
  errors: [BadRequestError, UnauthorizedError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/filter/{id}", data) as any
  },
})
