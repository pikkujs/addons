// activity — Activity APIs provide access to notifications, subscriptions, and timelines.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const ActivityListPublicEventsForRepoNetworkInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  per_page: z.number().int().optional().default(30).describe("The number of results per page (max 100)."),
  page: z.number().int().optional().default(1).describe("Page number of the results to fetch."),
})

export const ActivityListPublicEventsForRepoNetworkOutput = z.any()

export const activityListPublicEventsForRepoNetwork = pikkuSessionlessFunc({
  input: ActivityListPublicEventsForRepoNetworkInput,
  output: ActivityListPublicEventsForRepoNetworkOutput,
  errors: [ForbiddenError, NotFoundError],
  func: async ({ github }, data) => {
    return github.call("GET", "/networks/{owner}/{repo}/events", data) as any
  },
})
