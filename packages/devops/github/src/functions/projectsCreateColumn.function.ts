// projects — Interact with GitHub Projects.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnauthorizedError, ForbiddenError, UnprocessableContentError } from '@pikku/core/errors'

export const ProjectsCreateColumnInput = z.object({
  project_id: z.number().int().describe("The unique identifier of the project."),
  name: z.string().describe("Name of the project column"),
})

export const ProjectsCreateColumnOutput = z.object({
  cards_url: z.string().url(),
  created_at: z.string().datetime(),
  id: z.number().int().describe("The unique identifier of the project column"),
  name: z.string().describe("Name of the project column"),
  node_id: z.string(),
  project_url: z.string().url(),
  updated_at: z.string().datetime(),
  url: z.string().url(),
}).describe("Project columns contain cards of work.")

export const projectsCreateColumn = pikkuSessionlessFunc({
  input: ProjectsCreateColumnInput,
  output: ProjectsCreateColumnOutput,
  errors: [UnauthorizedError, ForbiddenError, UnprocessableContentError],
  func: async ({ github }, data) => {
    return github.call("POST", "/projects/{project_id}/columns", data) as any
  },
})
