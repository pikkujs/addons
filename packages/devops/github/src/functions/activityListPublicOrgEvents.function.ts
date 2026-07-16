// activity — Activity APIs provide access to notifications, subscriptions, and timelines.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ActivityListPublicOrgEventsInput = z.object({
  org: z.string().describe("The organization name. The name is not case sensitive."),
  per_page: z.number().int().optional().default(30).describe("The number of results per page (max 100)."),
  page: z.number().int().optional().default(1).describe("Page number of the results to fetch."),
})

export const ActivityListPublicOrgEventsOutput = z.any()

export const activityListPublicOrgEvents = pikkuSessionlessFunc({
  input: ActivityListPublicOrgEventsInput,
  output: ActivityListPublicOrgEventsOutput,
  func: async ({ github }, data) => {
    return github.call("GET", "/orgs/{org}/events", data) as any
  },
})
