// repos — Interact with GitHub Repos.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { NotFoundError } from '@pikku/core/errors'

export const ReposTestPushWebhookInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  hook_id: z.number().int().describe("The unique identifier of the hook."),
})

export const reposTestPushWebhook = pikkuSessionlessFunc({
  description: "This will trigger the hook with the latest push to the current repository if the hook is subscribed to `push` events. If the hook is not subscribed to `push` events, the server will respond with 204 but no test POST will be generated.\n\n**Note**: Previously `/repos/:owner/:repo/hooks/:hook_id/test`",
  input: ReposTestPushWebhookInput,
  errors: [NotFoundError],
  func: async ({ github }, data) => {
    return github.call("POST", "/repos/{owner}/{repo}/hooks/{hook_id}/tests", data)
  },
})
