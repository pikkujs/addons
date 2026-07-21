// repos — Interact with GitHub Repos.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnprocessableContentError } from '@pikku/core/errors'

export const ReposSetTeamAccessRestrictionsInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  branch: z.string().describe("The name of the branch. Cannot contain wildcard characters. To use wildcard characters in branch names, use [the GraphQL API](https://docs.github.com/graphql)."),
  body: z.union([z.object({
  teams: z.array(z.string()).describe("The slug values for teams"),
}), z.array(z.string())]),
})

export const ReposSetTeamAccessRestrictionsOutput = z.array(z.object({
  description: z.string().nullable(),
  html_url: z.string().url(),
  id: z.number().int(),
  members_url: z.string(),
  name: z.string(),
  node_id: z.string(),
  parent: z.object({
    description: z.string().nullable().describe("Description of the team"),
    html_url: z.string().url(),
    id: z.number().int().describe("Unique identifier of the team"),
    ldap_dn: z.string().optional().describe("Distinguished Name (DN) that team maps to within LDAP environment"),
    members_url: z.string(),
    name: z.string().describe("Name of the team"),
    node_id: z.string(),
    permission: z.string().describe("Permission that the team will have for its repositories"),
    privacy: z.string().optional().describe("The level of privacy this team should have"),
    repositories_url: z.string().url(),
    slug: z.string(),
    url: z.string().url().describe("URL for the team"),
  }).nullable().describe("Groups of organization members that gives permissions on specified repositories."),
  permission: z.string(),
  permissions: z.object({
    admin: z.boolean(),
    maintain: z.boolean(),
    pull: z.boolean(),
    push: z.boolean(),
    triage: z.boolean(),
  }).optional(),
  privacy: z.string().optional(),
  repositories_url: z.string().url(),
  slug: z.string(),
  url: z.string().url(),
}))

export const reposSetTeamAccessRestrictions = pikkuSessionlessFunc({
  description: "Protected branches are available in public repositories with GitHub Free and GitHub Free for organizations, and in public and private repositories with GitHub Pro, GitHub Team, GitHub Enterprise Cloud, and GitHub Enterprise Server. For more information, see [GitHub's products](https://docs.github.com/github/getting-started-with-github/githubs-products) in the GitHub Help documentation.\n\nReplaces the list of teams that have push access to this branch. This removes all teams that previously had push access and grants push access to the new list of teams. Team restrictions include child teams.",
  input: ReposSetTeamAccessRestrictionsInput,
  output: ReposSetTeamAccessRestrictionsOutput,
  errors: [UnprocessableContentError],
  func: async ({ github }, data) => {
    return github.call("PUT", "/repos/{owner}/{repo}/branches/{branch}/protection/restrictions/teams", data) as any
  },
})
