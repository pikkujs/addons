// projects — Interact with GitHub Projects.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { UnauthorizedError, ForbiddenError, NotFoundError, UnprocessableContentError } from '@pikku/core/errors'

export const ProjectsUpdateInput = z.object({
  project_id: z.number().int().describe("The unique identifier of the project."),
  body: z.string().nullable().optional().describe("Body of the project"),
  name: z.string().optional().describe("Name of the project"),
  organization_permission: z.enum(["read", "write", "admin", "none"]).optional().describe("The baseline permission that all organization members have on this project"),
  private: z.boolean().optional().describe("Whether or not this project can be seen by everyone."),
  state: z.string().optional().describe("State of the project; either 'open' or 'closed'"),
})

export const ProjectsUpdateOutput = z.object({
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
}).describe("Projects are a way to organize columns and cards of work.")

export const projectsUpdate = pikkuSessionlessFunc({
  description: "Updates a project board's information. Returns a `404 Not Found` status if projects are disabled. If you do not have sufficient privileges to perform this action, a `401 Unauthorized` or `410 Gone` status is returned.",
  input: ProjectsUpdateInput,
  output: ProjectsUpdateOutput,
  errors: [UnauthorizedError, ForbiddenError, NotFoundError, UnprocessableContentError],
  func: async ({ github }, data) => {
    return github.call("PATCH", "/projects/{project_id}", data) as any
  },
})
