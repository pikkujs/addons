// Filters — This resource represents [filters](https://confluence.atlassian.com/x/eQiiLQ). Use it to get, create, update, or delete filters. Also use it to configure the columns for a filter and set favorite filters.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'

export const DeleteFavouriteForFilterInput = z.object({
  id: z.number().int().describe("The ID of the filter."),
  expand: z.string().optional().describe("Use [expand](#expansion) to include additional information about filter in the response. This parameter accepts a comma-separated list. Expand options include:\n\n *  `sharedUsers` Returns the users that the filter is shared with. This includes users that can browse projects that the filter is shared with. If you don't specify `sharedUsers`, then the `sharedUsers` object is returned but it doesn't list any users. The list of users returned is limited to 1000, to access additional users append `[start-index:end-index]` to the expand request. For example, to access the next 1000 users, use `?expand=sharedUsers[1001:2000]`.\n *  `subscriptions` Returns the users that are subscribed to the filter. If you don't specify `subscriptions`, the `subscriptions` object is returned but it doesn't list any subscriptions. The list of subscriptions returned is limited to 1000, to access additional subscriptions append `[start-index:end-index]` to the expand request. For example, to access the next 1000 subscriptions, use `?expand=subscriptions[1001:2000]`."),
})

export const DeleteFavouriteForFilterOutput = z.any()

export const deleteFavouriteForFilter = pikkuSessionlessFunc({
  description: "Removes a filter as a favorite for the user. Note that this operation only removes filters visible to the user from the user's favorites list. For example, if the user favorites a public filter that is subsequently made private (and is therefore no longer visible on their favorites list) they cannot remove it from their favorites list.\n\n**[Permissions](#permissions) required:** Permission to access Jira.",
  input: DeleteFavouriteForFilterInput,
  output: DeleteFavouriteForFilterOutput,
  errors: [BadRequestError],
  func: async ({ jira }, data) => {
    return jira.call("DELETE", "/rest/api/3/filter/{id}/favourite", data) as any
  },
})
