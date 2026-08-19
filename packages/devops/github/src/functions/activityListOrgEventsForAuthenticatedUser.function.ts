// activity — Activity APIs provide access to notifications, subscriptions, and timelines.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ActivityListOrgEventsForAuthenticatedUserInput = z.object({
  username: z.string().describe("The handle for the GitHub user account."),
  org: z.string().describe("The organization name. The name is not case sensitive."),
  per_page: z.number().int().optional().default(30).describe("The number of results per page (max 100)."),
  page: z.number().int().optional().default(1).describe("Page number of the results to fetch."),
})

export const ActivityListOrgEventsForAuthenticatedUserOutput = z.any()

export const activityListOrgEventsForAuthenticatedUser = pikkuSessionlessFunc({
  description: "This is the user's organization dashboard. You must be authenticated as the user to view this.",
  input: ActivityListOrgEventsForAuthenticatedUserInput,
  output: ActivityListOrgEventsForAuthenticatedUserOutput,
  func: async ({ github }, data) => {
    return github.call("GET", "/users/{username}/events/orgs/{org}", data) as any
  },
})
