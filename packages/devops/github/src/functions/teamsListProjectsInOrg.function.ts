// teams — Interact with GitHub Teams.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const TeamsListProjectsInOrgInput = z.object({
  org: z.string().describe("The organization name. The name is not case sensitive."),
  team_slug: z.string().describe("The slug of the team name."),
  per_page: z.number().int().optional().default(30).describe("The number of results per page (max 100)."),
  page: z.number().int().optional().default(1).describe("Page number of the results to fetch."),
})

export const TeamsListProjectsInOrgOutput = z.array(z.object({
  body: z.string().nullable(),
  columns_url: z.string(),
  created_at: z.string(),
  creator: z.object({
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
  }).describe("A GitHub user."),
  html_url: z.string(),
  id: z.number().int(),
  name: z.string(),
  node_id: z.string(),
  number: z.number().int(),
  organization_permission: z.string().optional().describe("The organization permission for this project. Only present when owner is an organization."),
  owner_url: z.string(),
  permissions: z.object({
    admin: z.boolean(),
    read: z.boolean(),
    write: z.boolean(),
  }),
  private: z.boolean().optional().describe("Whether the project is private or not. Only present when owner is an organization."),
  state: z.string(),
  updated_at: z.string(),
  url: z.string(),
}))

export const teamsListProjectsInOrg = pikkuSessionlessFunc({
  description: "Lists the organization projects for a team.\n\n**Note:** You can also specify a team by `org_id` and `team_id` using the route `GET /organizations/{org_id}/team/{team_id}/projects`.",
  input: TeamsListProjectsInOrgInput,
  output: TeamsListProjectsInOrgOutput,
  func: async ({ github }, data) => {
    return github.call("GET", "/orgs/{org}/teams/{team_slug}/projects", data) as any
  },
})
