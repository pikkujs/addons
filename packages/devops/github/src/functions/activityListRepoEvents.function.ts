// activity — Activity APIs provide access to notifications, subscriptions, and timelines.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ActivityListRepoEventsInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  per_page: z.number().int().optional().default(30).describe("The number of results per page (max 100)."),
  page: z.number().int().optional().default(1).describe("Page number of the results to fetch."),
})

export const ActivityListRepoEventsOutput = z.any()

export const activityListRepoEvents = pikkuSessionlessFunc({
  input: ActivityListRepoEventsInput,
  output: ActivityListRepoEventsOutput,
  func: async ({ github }, data) => {
    return github.call("GET", "/repos/{owner}/{repo}/events", data) as any
  },
})
