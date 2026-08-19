// projects — Interact with GitHub Projects.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { UnauthorizedError, ForbiddenError, NotFoundError, UnprocessableContentError } from '@pikku/core/errors'

export const ProjectsListForRepoInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  state: z.enum(["open", "closed", "all"]).optional().default("open").describe("Indicates the state of the projects to return."),
  per_page: z.number().int().optional().default(30).describe("The number of results per page (max 100)."),
  page: z.number().int().optional().default(1).describe("Page number of the results to fetch."),
})

export const ProjectsListForRepoOutput = z.array(z.object({
  body: z.string().nullable().describe("Body of the project"),
  columns_url: z.string().url(),
  created_at: z.string().datetime(),
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
  }).nullable().describe("A GitHub user."),
  html_url: z.string().url(),
  id: z.number().int(),
  name: z.string().describe("Name of the project"),
  node_id: z.string(),
  number: z.number().int(),
  organization_permission: z.enum(["read", "write", "admin", "none"]).optional().describe("The baseline permission that all organization members have on this project. Only present if owner is an organization."),
  owner_url: z.string().url(),
  private: z.boolean().optional().describe("Whether or not this project can be seen by everyone. Only present if owner is an organization."),
  state: z.string().describe("State of the project; either 'open' or 'closed'"),
  updated_at: z.string().datetime(),
  url: z.string().url(),
}))

export const projectsListForRepo = pikkuSessionlessFunc({
  description: "Lists the projects in a repository. Returns a `404 Not Found` status if projects are disabled in the repository. If you do not have sufficient privileges to perform this action, a `401 Unauthorized` or `410 Gone` status is returned.",
  input: ProjectsListForRepoInput,
  output: ProjectsListForRepoOutput,
  errors: [UnauthorizedError, ForbiddenError, NotFoundError, UnprocessableContentError],
  func: async ({ github }, data) => {
    return github.call("GET", "/repos/{owner}/{repo}/projects", data) as any
  },
})
