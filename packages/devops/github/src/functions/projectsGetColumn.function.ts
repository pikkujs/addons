// projects — Interact with GitHub Projects.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const ProjectsGetColumnInput = z.object({
  column_id: z.number().int().describe("The unique identifier of the column."),
})

export const ProjectsGetColumnOutput = z.object({
  cards_url: z.string().url(),
  created_at: z.string().datetime(),
  id: z.number().int().describe("The unique identifier of the project column"),
  name: z.string().describe("Name of the project column"),
  node_id: z.string(),
  project_url: z.string().url(),
  updated_at: z.string().datetime(),
  url: z.string().url(),
}).describe("Project columns contain cards of work.")

export const projectsGetColumn = pikkuSessionlessFunc({
  input: ProjectsGetColumnInput,
  output: ProjectsGetColumnOutput,
  errors: [UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ github }, data) => {
    return github.call("GET", "/projects/columns/{column_id}", data) as any
  },
})
