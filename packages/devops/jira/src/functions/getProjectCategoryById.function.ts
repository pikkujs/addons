// Project categories — This resource represents project categories. Use it to create, update, and delete project categories as well as obtain a list of all project categories and details of individual categories. For more information on managing project categories, see [Adding, assigning, and deleting project categories](https://confluence.atlassian.com/x/-A5WMg).

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { UnauthorizedError, NotFoundError } from '@pikku/core/errors'

export const GetProjectCategoryByIdInput = z.object({
  id: z.number().int().describe("The ID of the project category."),
})

export const GetProjectCategoryByIdOutput = z.object({
  description: z.string().optional().describe("The description of the project category."),
  id: z.string().optional().describe("The ID of the project category."),
  name: z.string().optional().describe("The name of the project category. Required on create, optional on update."),
  self: z.string().url().optional().describe("The URL of the project category."),
}).describe("A project category.")

export const getProjectCategoryById = pikkuSessionlessFunc({
  description: "Returns a project category.\n\n**[Permissions](#permissions) required:** Permission to access Jira.",
  input: GetProjectCategoryByIdInput,
  output: GetProjectCategoryByIdOutput,
  errors: [UnauthorizedError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/projectCategory/{id}", data) as any
  },
})
