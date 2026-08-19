// repos — Interact with GitHub Repos.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ReposGetWebhookConfigForRepoInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  hook_id: z.number().int().describe("The unique identifier of the hook."),
})

export const ReposGetWebhookConfigForRepoOutput = z.object({
  content_type: z.string().optional().describe("The media type used to serialize the payloads. Supported values include `json` and `form`. The default is `form`."),
  insecure_ssl: z.union([z.string(), z.number()]).optional(),
  secret: z.string().optional().describe("If provided, the `secret` will be used as the `key` to generate the HMAC hex digest value for [delivery signature headers](https://docs.github.com/webhooks/event-payloads/#delivery-headers)."),
  url: z.string().url().optional().describe("The URL to which the payloads will be delivered."),
}).describe("Configuration object of the webhook")

export const reposGetWebhookConfigForRepo = pikkuSessionlessFunc({
  description: "Returns the webhook configuration for a repository. To get more information about the webhook, including the `active` state and `events`, use \"[Get a repository webhook](/rest/reference/orgs#get-a-repository-webhook).\"\n\nAccess tokens must have the `read:repo_hook` or `repo` scope, and GitHub Apps must have the `repository_hooks:read` permission.",
  input: ReposGetWebhookConfigForRepoInput,
  output: ReposGetWebhookConfigForRepoOutput,
  func: async ({ github }, data) => {
    return github.call("GET", "/repos/{owner}/{repo}/hooks/{hook_id}/config", data) as any
  },
})
