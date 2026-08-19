// system — General endpoints for interating with the server, such as configuration and logging.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const ListAnalyticsOldInput = z.object({
  name: z.string().optional().default("standard").describe("Possible values are \"standard\", \"post_counts_day\", \"user_counts_with_posts_day\" or \"extra_counts\""),
  team_id: z.string().optional().describe("The team ID to filter the data by"),
})

export const listAnalyticsOld = pikkuSessionlessFunc({
  description: "Get some analytics data about the system. This endpoint uses the old format, the `/analytics` route is reserved for the new format when it gets implemented.\n\nThe returned JSON changes based on the `name` query parameter but is always key/value pairs.\n\n__Minimum server version__: 4.0\n\n##### Permissions\nMust have `manage_system` permission.",
  input: ListAnalyticsOldInput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("GET", "/analytics/old", data)
  },
})
