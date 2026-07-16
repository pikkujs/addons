// repos — Interact with GitHub Repos.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnprocessableContentError } from '@pikku/core/errors'

export const ReposCreateDispatchEventInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  client_payload: z.record(z.string(), z.unknown()).optional().describe("JSON payload with extra information about the webhook event that your action or workflow may use. The maximum number of top-level properties is 10."),
  event_type: z.string().min(1).max(100).describe("A custom webhook event name. Must be 100 characters or fewer."),
})

export const reposCreateDispatchEvent = pikkuSessionlessFunc({
  description: "You can use this endpoint to trigger a webhook event called `repository_dispatch` when you want activity that happens outside of GitHub to trigger a GitHub Actions workflow or GitHub App webhook. You must configure your GitHub Actions workflow or GitHub App to run when the `repository_dispatch` event occurs. For an example `repository_dispatch` webhook payload, see \"[RepositoryDispatchEvent](https://docs.github.com/webhooks/event-payloads/#repository_dispatch).\"\n\nThe `client_payload` parameter is available for any extra information that your workflow might need. This parameter is a JSON payload that will be passed on when the webhook event is dispatched. For example, the `client_payload` can include a message that a user would like to send using a GitHub Actions workflow. Or the `client_payload` can be used as a test to debug your workflow.\n\nThis endpoint requires write access to the repository by providing either:\n\n  - Personal access tokens with `repo` scope. For more information, see \"[Creating a personal access token for the command line](https://docs.github.com/articles/creating-a-personal-access-token-for-the-command-line)\" in the GitHub Help documentation.\n  - GitHub Apps with both `metadata:read` and `contents:read&write` permissions.\n\nThis input example shows how you can use the `client_payload` as a test to debug your workflow.",
  input: ReposCreateDispatchEventInput,
  errors: [UnprocessableContentError],
  func: async ({ github }, data) => {
    return github.call("POST", "/repos/{owner}/{repo}/dispatches", data)
  },
})
