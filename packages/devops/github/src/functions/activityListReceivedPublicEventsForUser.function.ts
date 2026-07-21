// activity — Activity APIs provide access to notifications, subscriptions, and timelines.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ActivityListReceivedPublicEventsForUserInput = z.object({
  username: z.string().describe("The handle for the GitHub user account."),
  per_page: z.number().int().optional().default(30).describe("The number of results per page (max 100)."),
  page: z.number().int().optional().default(1).describe("Page number of the results to fetch."),
})

export const ActivityListReceivedPublicEventsForUserOutput = z.any()

export const activityListReceivedPublicEventsForUser = pikkuSessionlessFunc({
  input: ActivityListReceivedPublicEventsForUserInput,
  output: ActivityListReceivedPublicEventsForUserOutput,
  func: async ({ github }, data) => {
    return github.call("GET", "/users/{username}/received_events/public", data) as any
  },
})
