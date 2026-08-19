// projects — Interact with GitHub Projects.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const ProjectsDeleteInput = z.object({
  project_id: z.number().int().describe("The unique identifier of the project."),
})

export const projectsDelete = pikkuSessionlessFunc({
  description: "Deletes a project board. Returns a `404 Not Found` status if projects are disabled.",
  input: ProjectsDeleteInput,
  errors: [UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ github }, data) => {
    return github.call("DELETE", "/projects/{project_id}", data)
  },
})
