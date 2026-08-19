// projects — Interact with GitHub Projects.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { UnauthorizedError, ForbiddenError, NotFoundError, UnprocessableContentError } from '@pikku/core/errors'

export const ProjectsRemoveCollaboratorInput = z.object({
  project_id: z.number().int().describe("The unique identifier of the project."),
  username: z.string().describe("The handle for the GitHub user account."),
})

export const projectsRemoveCollaborator = pikkuSessionlessFunc({
  description: "Removes a collaborator from an organization project. You must be an organization owner or a project `admin` to remove a collaborator.",
  input: ProjectsRemoveCollaboratorInput,
  errors: [UnauthorizedError, ForbiddenError, NotFoundError, UnprocessableContentError],
  func: async ({ github }, data) => {
    return github.call("DELETE", "/projects/{project_id}/collaborators/{username}", data)
  },
})
