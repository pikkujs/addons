// activity — Activity APIs provide access to notifications, subscriptions, and timelines.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const ActivityGetRepoSubscriptionInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
})

export const ActivityGetRepoSubscriptionOutput = z.object({
  created_at: z.string().datetime(),
  ignored: z.boolean().describe("Determines if all notifications should be blocked from this repository."),
  reason: z.string().nullable(),
  repository_url: z.string().url(),
  subscribed: z.boolean().describe("Determines if notifications should be received from this repository."),
  url: z.string().url(),
}).describe("Repository invitations let you manage who you collaborate with.")

export const activityGetRepoSubscription = pikkuSessionlessFunc({
  input: ActivityGetRepoSubscriptionInput,
  output: ActivityGetRepoSubscriptionOutput,
  errors: [ForbiddenError, NotFoundError],
  func: async ({ github }, data) => {
    return github.call("GET", "/repos/{owner}/{repo}/subscription", data) as any
  },
})
