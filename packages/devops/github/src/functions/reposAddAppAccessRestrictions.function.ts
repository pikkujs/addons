// repos — Interact with GitHub Repos.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { UnprocessableContentError } from '@pikku/core/errors'

export const ReposAddAppAccessRestrictionsInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  branch: z.string().describe("The name of the branch. Cannot contain wildcard characters. To use wildcard characters in branch names, use [the GraphQL API](https://docs.github.com/graphql)."),
  body: z.union([z.object({
  apps: z.array(z.string()).describe("The GitHub Apps that have push access to this branch. Use the slugified version of the app name. **Note**: The list of users, apps, and teams in total is limited to 100 items."),
}), z.array(z.string())]),
})

export const ReposAddAppAccessRestrictionsOutput = z.array(z.object({
  client_id: z.string().optional(),
  client_secret: z.string().optional(),
  created_at: z.string().datetime(),
  description: z.string().nullable(),
  events: z.array(z.string()).describe("The list of events for the GitHub app"),
  external_url: z.string().url(),
  html_url: z.string().url(),
  id: z.number().int().describe("Unique identifier of the GitHub app"),
  installations_count: z.number().int().optional().describe("The number of installations associated with the GitHub app"),
  name: z.string().describe("The name of the GitHub app"),
  node_id: z.string(),
  owner: z.object({
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
  pem: z.string().optional(),
  permissions: z.object({
    checks: z.string().optional(),
    contents: z.string().optional(),
    deployments: z.string().optional(),
    issues: z.string().optional(),
    metadata: z.string().optional(),
  }).describe("The set of permissions for the GitHub app"),
  slug: z.string().optional().describe("The slug name of the GitHub app"),
  updated_at: z.string().datetime(),
  webhook_secret: z.string().nullable().optional(),
}))

export const reposAddAppAccessRestrictions = pikkuSessionlessFunc({
  description: "Protected branches are available in public repositories with GitHub Free and GitHub Free for organizations, and in public and private repositories with GitHub Pro, GitHub Team, GitHub Enterprise Cloud, and GitHub Enterprise Server. For more information, see [GitHub's products](https://docs.github.com/github/getting-started-with-github/githubs-products) in the GitHub Help documentation.\n\nGrants the specified apps push access for this branch. Only installed GitHub Apps with `write` access to the `contents` permission can be added as authorized actors on a protected branch.",
  input: ReposAddAppAccessRestrictionsInput,
  output: ReposAddAppAccessRestrictionsOutput,
  errors: [UnprocessableContentError],
  func: async ({ github }, data) => {
    return github.call("POST", "/repos/{owner}/{repo}/branches/{branch}/protection/restrictions/apps", data) as any
  },
})
