// Project roles — This resource represents the roles that users can play in projects. Use this resource to get, create, update, and delete project roles.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, ConflictError } from '@pikku/core/errors'

export const DeleteProjectRoleInput = z.object({
  id: z.number().int().describe("The ID of the project role to delete. Use [Get all project roles](#api-rest-api-3-role-get) to get a list of project role IDs."),
  swap: z.number().int().optional().describe("The ID of the project role that will replace the one being deleted."),
})

export const deleteProjectRole = pikkuSessionlessFunc({
  description: "Deletes a project role. You must specify a replacement project role if you wish to delete a project role that is in use.\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: DeleteProjectRoleInput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, ConflictError],
  func: async ({ jira }, data) => {
    return jira.call("DELETE", "/rest/api/3/role/{id}", data)
  },
})
