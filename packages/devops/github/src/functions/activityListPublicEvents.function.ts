// activity — Activity APIs provide access to notifications, subscriptions, and timelines.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { ForbiddenError } from '@pikku/core/errors'

export const ActivityListPublicEventsInput = z.object({
  per_page: z.number().int().optional().default(30).describe("The number of results per page (max 100)."),
  page: z.number().int().optional().default(1).describe("Page number of the results to fetch."),
})

export const ActivityListPublicEventsOutput = z.any()

export const activityListPublicEvents = pikkuSessionlessFunc({
  description: "We delay the public events feed by five minutes, which means the most recent event returned by the public events API actually occurred at least five minutes ago.",
  input: ActivityListPublicEventsInput,
  output: ActivityListPublicEventsOutput,
  errors: [ForbiddenError],
  func: async ({ github }, data) => {
    return github.call("GET", "/events", data) as any
  },
})
