// Workflow status categories — This resource represents status categories. Use it to obtain a list of all status categories and the details of a category. Status categories provided a mechanism for categorizing [statuses](#api-group-Workflow-statuses).

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { UnauthorizedError, NotFoundError } from '@pikku/core/errors'

export const GetStatusCategoryInput = z.object({
  idOrKey: z.string().describe("The ID or key of the status category."),
})

export const GetStatusCategoryOutput = z.object({
  colorName: z.string().optional().describe("The name of the color used to represent the status category."),
  id: z.number().int().optional().describe("The ID of the status category."),
  key: z.string().optional().describe("The key of the status category."),
  name: z.string().optional().describe("The name of the status category."),
  self: z.string().optional().describe("The URL of the status category."),
}).describe("A status category.")

export const getStatusCategory = pikkuSessionlessFunc({
  description: "Returns a status category. Status categories provided a mechanism for categorizing [statuses](#api-rest-api-3-status-idOrName-get).\n\n**[Permissions](#permissions) required:** Permission to access Jira.",
  input: GetStatusCategoryInput,
  output: GetStatusCategoryOutput,
  errors: [UnauthorizedError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/statuscategory/{idOrKey}", data) as any
  },
})
