// Filters — This resource represents [filters](https://confluence.atlassian.com/x/eQiiLQ). Use it to get, create, update, or delete filters. Also use it to configure the columns for a filter and set favorite filters.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { UnauthorizedError } from '@pikku/core/errors'

export const GetMyFiltersInput = z.object({
  expand: z.string().optional().describe("Use [expand](#expansion) to include additional information about filter in the response. This parameter accepts a comma-separated list. Expand options include:\n\n *  `sharedUsers` Returns the users that the filter is shared with. This includes users that can browse projects that the filter is shared with. If you don't specify `sharedUsers`, then the `sharedUsers` object is returned but it doesn't list any users. The list of users returned is limited to 1000, to access additional users append `[start-index:end-index]` to the expand request. For example, to access the next 1000 users, use `?expand=sharedUsers[1001:2000]`.\n *  `subscriptions` Returns the users that are subscribed to the filter. If you don't specify `subscriptions`, the `subscriptions` object is returned but it doesn't list any subscriptions. The list of subscriptions returned is limited to 1000, to access additional subscriptions append `[start-index:end-index]` to the expand request. For example, to access the next 1000 subscriptions, use `?expand=subscriptions[1001:2000]`."),
  includeFavourites: z.boolean().optional().default(false).describe("Include the user's favorite filters in the response."),
})

export const GetMyFiltersOutput = z.any()

export const getMyFilters = pikkuSessionlessFunc({
  description: "Returns the filters owned by the user. If `includeFavourites` is `true`, the user's visible favorite filters are also returned.\n\n**[Permissions](#permissions) required:** Permission to access Jira, however, a favorite filters is only visible to the user where the filter is:\n\n *  owned by the user.\n *  shared with a group that the user is a member of.\n *  shared with a private project that the user has *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for.\n *  shared with a public project.\n *  shared with the public.\n\nFor example, if the user favorites a public filter that is subsequently made private that filter is not returned by this operation.",
  input: GetMyFiltersInput,
  output: GetMyFiltersOutput,
  errors: [UnauthorizedError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/filter/my", data) as any
  },
})
