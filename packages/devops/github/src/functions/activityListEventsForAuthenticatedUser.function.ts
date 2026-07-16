// activity — Activity APIs provide access to notifications, subscriptions, and timelines.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ActivityListEventsForAuthenticatedUserInput = z.object({
  username: z.string().describe("The handle for the GitHub user account."),
  per_page: z.number().int().optional().default(30).describe("The number of results per page (max 100)."),
  page: z.number().int().optional().default(1).describe("Page number of the results to fetch."),
})

export const ActivityListEventsForAuthenticatedUserOutput = z.any()

export const activityListEventsForAuthenticatedUser = pikkuSessionlessFunc({
  description: "If you are authenticated as the given user, you will see your private events. Otherwise, you'll only see public events.",
  input: ActivityListEventsForAuthenticatedUserInput,
  output: ActivityListEventsForAuthenticatedUserOutput,
  func: async ({ github }, data) => {
    return github.call("GET", "/users/{username}/events", data) as any
  },
})
