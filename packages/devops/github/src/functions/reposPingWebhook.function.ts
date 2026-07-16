// repos — Interact with GitHub Repos.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { NotFoundError } from '@pikku/core/errors'

export const ReposPingWebhookInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  hook_id: z.number().int().describe("The unique identifier of the hook."),
})

export const reposPingWebhook = pikkuSessionlessFunc({
  description: "This will trigger a [ping event](https://docs.github.com/webhooks/#ping-event) to be sent to the hook.",
  input: ReposPingWebhookInput,
  errors: [NotFoundError],
  func: async ({ github }, data) => {
    return github.call("POST", "/repos/{owner}/{repo}/hooks/{hook_id}/pings", data)
  },
})
