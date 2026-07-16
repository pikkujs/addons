// projects — Interact with GitHub Projects.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const ProjectsListColumnsInput = z.object({
  project_id: z.number().int().describe("The unique identifier of the project."),
  per_page: z.number().int().optional().default(30).describe("The number of results per page (max 100)."),
  page: z.number().int().optional().default(1).describe("Page number of the results to fetch."),
})

export const ProjectsListColumnsOutput = z.array(z.object({
  cards_url: z.string().url(),
  created_at: z.string().datetime(),
  id: z.number().int().describe("The unique identifier of the project column"),
  name: z.string().describe("Name of the project column"),
  node_id: z.string(),
  project_url: z.string().url(),
  updated_at: z.string().datetime(),
  url: z.string().url(),
}))

export const projectsListColumns = pikkuSessionlessFunc({
  input: ProjectsListColumnsInput,
  output: ProjectsListColumnsOutput,
  errors: [UnauthorizedError, ForbiddenError],
  func: async ({ github }, data) => {
    return github.call("GET", "/projects/{project_id}/columns", data) as any
  },
})
