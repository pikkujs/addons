// projects — Interact with GitHub Projects.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const ProjectsDeleteColumnInput = z.object({
  column_id: z.number().int().describe("The unique identifier of the column."),
})

export const projectsDeleteColumn = pikkuSessionlessFunc({
  input: ProjectsDeleteColumnInput,
  errors: [UnauthorizedError, ForbiddenError],
  func: async ({ github }, data) => {
    return github.call("DELETE", "/projects/columns/{column_id}", data)
  },
})
