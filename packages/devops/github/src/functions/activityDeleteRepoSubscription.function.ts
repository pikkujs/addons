// activity — Activity APIs provide access to notifications, subscriptions, and timelines.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ActivityDeleteRepoSubscriptionInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
})

export const activityDeleteRepoSubscription = pikkuSessionlessFunc({
  description: "This endpoint should only be used to stop watching a repository. To control whether or not you wish to receive notifications from a repository, [set the repository's subscription manually](https://docs.github.com/rest/reference/activity#set-a-repository-subscription).",
  input: ActivityDeleteRepoSubscriptionInput,
  func: async ({ github }, data) => {
    return github.call("DELETE", "/repos/{owner}/{repo}/subscription", data)
  },
})
