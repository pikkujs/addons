// repos — Interact with GitHub Repos.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { NotFoundError } from '@pikku/core/errors'

export const ReposListCollaboratorsInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  affiliation: z.enum(["outside", "direct", "all"]).optional().default("all").describe("Filter collaborators returned by their affiliation. `outside` means all outside collaborators of an organization-owned repository. `direct` means all collaborators with permissions to an organization-owned repository, regardless of organization membership status. `all` means all collaborators the authenticated user can see."),
  permission: z.enum(["pull", "triage", "push", "maintain", "admin"]).optional().describe("Filter collaborators by the permissions they have on the repository. If not specified, all collaborators will be returned."),
  per_page: z.number().int().optional().default(30).describe("The number of results per page (max 100)."),
  page: z.number().int().optional().default(1).describe("Page number of the results to fetch."),
})

export const ReposListCollaboratorsOutput = z.array(z.object({
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
  permissions: z.object({
    admin: z.boolean(),
    maintain: z.boolean().optional(),
    pull: z.boolean(),
    push: z.boolean(),
    triage: z.boolean().optional(),
  }).optional(),
  received_events_url: z.string().url(),
  repos_url: z.string().url(),
  role_name: z.string(),
  site_admin: z.boolean(),
  starred_url: z.string(),
  subscriptions_url: z.string().url(),
  type: z.string(),
  url: z.string().url(),
}))

export const reposListCollaborators = pikkuSessionlessFunc({
  description: "For organization-owned repositories, the list of collaborators includes outside collaborators, organization members that are direct collaborators, organization members with access through team memberships, organization members with access through default organization permissions, and organization owners.\nOrganization members with write, maintain, or admin privileges on the organization-owned repository can use this endpoint.\n\nTeam members will include the members of child teams.\n\nYou must authenticate using an access token with the `read:org` and `repo` scopes with push access to use this\nendpoint. GitHub Apps must have the `members` organization permission and `metadata` repository permission to use this\nendpoint.",
  input: ReposListCollaboratorsInput,
  output: ReposListCollaboratorsOutput,
  errors: [NotFoundError],
  func: async ({ github }, data) => {
    return github.call("GET", "/repos/{owner}/{repo}/collaborators", data) as any
  },
})
