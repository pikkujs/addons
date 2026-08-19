// activity — Activity APIs provide access to notifications, subscriptions, and timelines.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ActivityListPublicEventsForUserInput = z.object({
  username: z.string().describe("The handle for the GitHub user account."),
  per_page: z.number().int().optional().default(30).describe("The number of results per page (max 100)."),
  page: z.number().int().optional().default(1).describe("Page number of the results to fetch."),
})

export const ActivityListPublicEventsForUserOutput = z.any()

export const activityListPublicEventsForUser = pikkuSessionlessFunc({
  input: ActivityListPublicEventsForUserInput,
  output: ActivityListPublicEventsForUserOutput,
  func: async ({ github }, data) => {
    return github.call("GET", "/users/{username}/events/public", data) as any
  },
})
