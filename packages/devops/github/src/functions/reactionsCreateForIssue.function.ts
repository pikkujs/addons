// reactions — Interact with reactions to various GitHub entities.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { UnprocessableContentError } from '@pikku/core/errors'

export const ReactionsCreateForIssueInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  issue_number: z.number().int().describe("The number that identifies the issue."),
  content: z.enum(["+1", "-1", "laugh", "confused", "heart", "hooray", "rocket", "eyes"]).describe("The [reaction type](https://docs.github.com/rest/reference/reactions#reaction-types) to add to the issue."),
})

export const ReactionsCreateForIssueOutput = z.object({
  content: z.enum(["+1", "-1", "laugh", "confused", "heart", "hooray", "rocket", "eyes"]).describe("The reaction to use"),
  created_at: z.string().datetime(),
  id: z.number().int(),
  node_id: z.string(),
  user: z.object({
    avatar_url: z.string().url(),
    email: z.string().nullable().optional(),
    events_url: z.string(),
    followers_url: z.string().url(),
    following_url: z.string(),
    gists_url: z.string(),
    gravatar_id: z.string().nullable(),
    html_url: z.string().url(),
    id: z.number().int(),
    login: z.string(),
    name: z.string().nullable().optional(),
    node_id: z.string(),
    organizations_url: z.string().url(),
    received_events_url: z.string().url(),
    repos_url: z.string().url(),
    site_admin: z.boolean(),
    starred_at: z.string().optional(),
    starred_url: z.string(),
    subscriptions_url: z.string().url(),
    type: z.string(),
    url: z.string().url(),
  }).nullable().describe("A GitHub user."),
}).describe("Reactions to conversations provide a way to help people express their feelings more simply and effectively.")

export const reactionsCreateForIssue = pikkuSessionlessFunc({
  description: "Create a reaction to an [issue](https://docs.github.com/rest/reference/issues/). A response with an HTTP `200` status means that you already added the reaction type to this issue.",
  input: ReactionsCreateForIssueInput,
  output: ReactionsCreateForIssueOutput,
  errors: [UnprocessableContentError],
  func: async ({ github }, data) => {
    return github.call("POST", "/repos/{owner}/{repo}/issues/{issue_number}/reactions", data) as any
  },
})
