// activity — Activity APIs provide access to notifications, subscriptions, and timelines.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ActivityListReceivedEventsForUserInput = z.object({
  username: z.string().describe("The handle for the GitHub user account."),
  per_page: z.number().int().optional().default(30).describe("The number of results per page (max 100)."),
  page: z.number().int().optional().default(1).describe("Page number of the results to fetch."),
})

export const ActivityListReceivedEventsForUserOutput = z.any()

export const activityListReceivedEventsForUser = pikkuSessionlessFunc({
  description: "These are events that you've received by watching repos and following users. If you are authenticated as the given user, you will see private events. Otherwise, you'll only see public events.",
  input: ActivityListReceivedEventsForUserInput,
  output: ActivityListReceivedEventsForUserOutput,
  func: async ({ github }, data) => {
    return github.call("GET", "/users/{username}/received_events", data) as any
  },
})
