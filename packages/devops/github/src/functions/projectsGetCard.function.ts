// projects — Interact with GitHub Projects.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const ProjectsGetCardInput = z.object({
  card_id: z.number().int().describe("The unique identifier of the card."),
})

export const ProjectsGetCardOutput = z.object({
  archived: z.boolean().optional().describe("Whether or not the card is archived"),
  column_name: z.string().optional(),
  column_url: z.string().url(),
  content_url: z.string().url().optional(),
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
  id: z.number().int().describe("The project card's ID"),
  node_id: z.string(),
  note: z.string().nullable(),
  project_id: z.string().optional(),
  project_url: z.string().url(),
  updated_at: z.string().datetime(),
  url: z.string().url(),
}).describe("Project cards represent a scope of work.")

export const projectsGetCard = pikkuSessionlessFunc({
  input: ProjectsGetCardInput,
  output: ProjectsGetCardOutput,
  errors: [UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ github }, data) => {
    return github.call("GET", "/projects/columns/cards/{card_id}", data) as any
  },
})
