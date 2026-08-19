// projects — Interact with GitHub Projects.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { UnauthorizedError, ForbiddenError, NotFoundError, UnprocessableContentError } from '@pikku/core/errors'

export const ProjectsAddCollaboratorInput = z.object({
  project_id: z.number().int().describe("The unique identifier of the project."),
  username: z.string().describe("The handle for the GitHub user account."),
  permission: z.enum(["read", "write", "admin"]).optional().default("write").describe("The permission to grant the collaborator."),
})

export const projectsAddCollaborator = pikkuSessionlessFunc({
  description: "Adds a collaborator to an organization project and sets their permission level. You must be an organization owner or a project `admin` to add a collaborator.",
  input: ProjectsAddCollaboratorInput,
  errors: [UnauthorizedError, ForbiddenError, NotFoundError, UnprocessableContentError],
  func: async ({ github }, data) => {
    return github.call("PUT", "/projects/{project_id}/collaborators/{username}", data)
  },
})
