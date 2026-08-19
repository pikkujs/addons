// activity — Activity APIs provide access to notifications, subscriptions, and timelines.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ActivitySetRepoSubscriptionInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  ignored: z.boolean().optional().describe("Determines if all notifications should be blocked from this repository."),
  subscribed: z.boolean().optional().describe("Determines if notifications should be received from this repository."),
})

export const ActivitySetRepoSubscriptionOutput = z.object({
  created_at: z.string().datetime(),
  ignored: z.boolean().describe("Determines if all notifications should be blocked from this repository."),
  reason: z.string().nullable(),
  repository_url: z.string().url(),
  subscribed: z.boolean().describe("Determines if notifications should be received from this repository."),
  url: z.string().url(),
}).describe("Repository invitations let you manage who you collaborate with.")

export const activitySetRepoSubscription = pikkuSessionlessFunc({
  description: "If you would like to watch a repository, set `subscribed` to `true`. If you would like to ignore notifications made within a repository, set `ignored` to `true`. If you would like to stop watching a repository, [delete the repository's subscription](https://docs.github.com/rest/reference/activity#delete-a-repository-subscription) completely.",
  input: ActivitySetRepoSubscriptionInput,
  output: ActivitySetRepoSubscriptionOutput,
  func: async ({ github }, data) => {
    return github.call("PUT", "/repos/{owner}/{repo}/subscription", data) as any
  },
})
