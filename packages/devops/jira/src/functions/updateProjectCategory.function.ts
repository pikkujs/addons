// Project categories — This resource represents project categories. Use it to create, update, and delete project categories as well as obtain a list of all project categories and details of individual categories. For more information on managing project categories, see [Adding, assigning, and deleting project categories](https://confluence.atlassian.com/x/-A5WMg).

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const UpdateProjectCategoryInput = z.object({
  id: z.number().int(),
  description: z.string().optional().describe("The description of the project category."),
  name: z.string().optional().describe("The name of the project category. Required on create, optional on update."),
})

export const UpdateProjectCategoryOutput = z.object({
  description: z.string().optional().describe("The name of the project category."),
  id: z.string().optional().describe("The ID of the project category."),
  name: z.string().optional().describe("The description of the project category."),
  self: z.string().optional().describe("The URL of the project category."),
}).describe("A project category.")

export const updateProjectCategory = pikkuSessionlessFunc({
  description: "Updates a project category.\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: UpdateProjectCategoryInput,
  output: UpdateProjectCategoryOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("PUT", "/rest/api/3/projectCategory/{id}", data) as any
  },
})
