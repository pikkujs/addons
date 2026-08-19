// projects — Interact with GitHub Projects.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const ProjectsUpdateColumnInput = z.object({
  column_id: z.number().int().describe("The unique identifier of the column."),
  name: z.string().describe("Name of the project column"),
})

export const ProjectsUpdateColumnOutput = z.object({
  cards_url: z.string().url(),
  created_at: z.string().datetime(),
  id: z.number().int().describe("The unique identifier of the project column"),
  name: z.string().describe("Name of the project column"),
  node_id: z.string(),
  project_url: z.string().url(),
  updated_at: z.string().datetime(),
  url: z.string().url(),
}).describe("Project columns contain cards of work.")

export const projectsUpdateColumn = pikkuSessionlessFunc({
  input: ProjectsUpdateColumnInput,
  output: ProjectsUpdateColumnOutput,
  errors: [UnauthorizedError, ForbiddenError],
  func: async ({ github }, data) => {
    return github.call("PATCH", "/projects/columns/{column_id}", data) as any
  },
})
