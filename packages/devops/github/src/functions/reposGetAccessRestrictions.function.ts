// repos — Interact with GitHub Repos.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { NotFoundError } from '@pikku/core/errors'

export const ReposGetAccessRestrictionsInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  branch: z.string().describe("The name of the branch. Cannot contain wildcard characters. To use wildcard characters in branch names, use [the GraphQL API](https://docs.github.com/graphql)."),
})

export const ReposGetAccessRestrictionsOutput = z.object({
  apps: z.array(z.object({
    created_at: z.string().optional(),
    description: z.string().optional(),
    events: z.array(z.string()).optional(),
    external_url: z.string().optional(),
    html_url: z.string().optional(),
    id: z.number().int().optional(),
    name: z.string().optional(),
    node_id: z.string().optional(),
    owner: z.object({
      avatar_url: z.string().optional(),
      description: z.string().optional(),
      events_url: z.string().optional(),
      followers_url: z.string().optional(),
      following_url: z.string().optional(),
      gists_url: z.string().optional(),
      gravatar_id: z.string().optional(),
      hooks_url: z.string().optional(),
      html_url: z.string().optional(),
      id: z.number().int().optional(),
      issues_url: z.string().optional(),
      login: z.string().optional(),
      members_url: z.string().optional(),
      node_id: z.string().optional(),
      organizations_url: z.string().optional(),
      public_members_url: z.string().optional(),
      received_events_url: z.string().optional(),
      repos_url: z.string().optional(),
      site_admin: z.boolean().optional(),
      starred_url: z.string().optional(),
      subscriptions_url: z.string().optional(),
      type: z.string().optional(),
      url: z.string().optional(),
    }).optional(),
    permissions: z.object({
      contents: z.string().optional(),
      issues: z.string().optional(),
      metadata: z.string().optional(),
      single_file: z.string().optional(),
    }).optional(),
    slug: z.string().optional(),
    updated_at: z.string().optional(),
  })),
  apps_url: z.string().url(),
  teams: z.array(z.object({
    description: z.string().nullable().optional(),
    html_url: z.string().optional(),
    id: z.number().int().optional(),
    members_url: z.string().optional(),
    name: z.string().optional(),
    node_id: z.string().optional(),
    parent: z.string().nullable().optional(),
    permission: z.string().optional(),
    privacy: z.string().optional(),
    repositories_url: z.string().optional(),
    slug: z.string().optional(),
    url: z.string().optional(),
  })),
  teams_url: z.string().url(),
  url: z.string().url(),
  users: z.array(z.object({
    avatar_url: z.string().optional(),
    events_url: z.string().optional(),
    followers_url: z.string().optional(),
    following_url: z.string().optional(),
    gists_url: z.string().optional(),
    gravatar_id: z.string().optional(),
    html_url: z.string().optional(),
    id: z.number().int().optional(),
    login: z.string().optional(),
    node_id: z.string().optional(),
    organizations_url: z.string().optional(),
    received_events_url: z.string().optional(),
    repos_url: z.string().optional(),
    site_admin: z.boolean().optional(),
    starred_url: z.string().optional(),
    subscriptions_url: z.string().optional(),
    type: z.string().optional(),
    url: z.string().optional(),
  })),
  users_url: z.string().url(),
}).describe("Branch Restriction Policy")

export const reposGetAccessRestrictions = pikkuSessionlessFunc({
  description: "Protected branches are available in public repositories with GitHub Free and GitHub Free for organizations, and in public and private repositories with GitHub Pro, GitHub Team, GitHub Enterprise Cloud, and GitHub Enterprise Server. For more information, see [GitHub's products](https://docs.github.com/github/getting-started-with-github/githubs-products) in the GitHub Help documentation.\n\nLists who has access to this protected branch.\n\n**Note**: Users, apps, and teams `restrictions` are only available for organization-owned repositories.",
  input: ReposGetAccessRestrictionsInput,
  output: ReposGetAccessRestrictionsOutput,
  errors: [NotFoundError],
  func: async ({ github }, data) => {
    return github.call("GET", "/repos/{owner}/{repo}/branches/{branch}/protection/restrictions", data) as any
  },
})
