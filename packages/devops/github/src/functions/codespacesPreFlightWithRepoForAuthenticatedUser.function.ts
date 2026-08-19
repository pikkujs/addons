// codespaces — Endpoints to manage Codespaces using the REST API.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const CodespacesPreFlightWithRepoForAuthenticatedUserInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  ref: z.string().optional().describe("The branch or commit to check for a default devcontainer path. If not specified, the default branch will be checked."),
  client_ip: z.string().optional().describe("An alternative IP for default location auto-detection, such as when proxying a request."),
})

export const CodespacesPreFlightWithRepoForAuthenticatedUserOutput = z.object({
  billable_owner: z.object({
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
  }).optional().describe("A GitHub user."),
  defaults: z.object({
    devcontainer_path: z.string().nullable(),
    location: z.string(),
  }).optional(),
})

export const codespacesPreFlightWithRepoForAuthenticatedUser = pikkuSessionlessFunc({
  description: "Gets the default attributes for codespaces created by the user with the repository.\n\nYou must authenticate using an access token with the `codespace` scope to use this endpoint.\n\nGitHub Apps must have write access to the `codespaces` repository permission to use this endpoint.",
  input: CodespacesPreFlightWithRepoForAuthenticatedUserInput,
  output: CodespacesPreFlightWithRepoForAuthenticatedUserOutput,
  errors: [UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ github }, data) => {
    return github.call("GET", "/repos/{owner}/{repo}/codespaces/new", data) as any
  },
})
