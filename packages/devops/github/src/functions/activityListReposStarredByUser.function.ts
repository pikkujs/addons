// activity — Activity APIs provide access to notifications, subscriptions, and timelines.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ActivityListReposStarredByUserInput = z.object({
  username: z.string().describe("The handle for the GitHub user account."),
  sort: z.enum(["created", "updated"]).optional().default("created").describe("The property to sort the results by. `created` means when the repository was starred. `updated` means when the repository was last pushed to."),
  direction: z.enum(["asc", "desc"]).optional().default("desc").describe("The direction to sort the results by."),
  per_page: z.number().int().optional().default(30).describe("The number of results per page (max 100)."),
  page: z.number().int().optional().default(1).describe("Page number of the results to fetch."),
})

export const ActivityListReposStarredByUserOutput = z.any()

export const activityListReposStarredByUser = pikkuSessionlessFunc({
  description: "Lists repositories a user has starred.\n\nYou can also find out _when_ stars were created by passing the following custom [media type](https://docs.github.com/rest/overview/media-types/) via the `Accept` header: `application/vnd.github.star+json`.",
  input: ActivityListReposStarredByUserInput,
  output: ActivityListReposStarredByUserOutput,
  func: async ({ github }, data) => {
    return github.call("GET", "/users/{username}/starred", data) as any
  },
})
