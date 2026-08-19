// Permissions — This resource represents permissions. Use it to obtain details of all permissions and determine whether the user has certain permissions.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError } from '@pikku/core/errors'

export const GetPermittedProjectsInput = z.object({
  permissions: z.array(z.string()).describe("A list of permission keys."),
})

export const GetPermittedProjectsOutput = z.object({
  projects: z.array(z.object({
    id: z.number().int().optional().describe("The ID of the project."),
    key: z.string().optional().describe("The key of the project."),
  })).optional().describe("A list of projects."),
}).describe("A list of projects in which a user is granted permissions.")

export const getPermittedProjects = pikkuSessionlessFunc({
  description: "Returns all the projects where the user is granted a list of project permissions.\n\nThis operation can be accessed anonymously.\n\n**[Permissions](#permissions) required:** None.",
  input: GetPermittedProjectsInput,
  output: GetPermittedProjectsOutput,
  errors: [BadRequestError, UnauthorizedError],
  func: async ({ jira }, data) => {
    return jira.call("POST", "/rest/api/3/permissions/project", data) as any
  },
})
