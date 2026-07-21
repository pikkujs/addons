// Workflow status categories — This resource represents status categories. Use it to obtain a list of all status categories and the details of a category. Status categories provided a mechanism for categorizing [statuses](#api-group-Workflow-statuses).

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnauthorizedError } from '@pikku/core/errors'

export const GetStatusCategoriesOutput = z.array(z.object({
  colorName: z.string().optional().describe("The name of the color used to represent the status category."),
  id: z.number().int().optional().describe("The ID of the status category."),
  key: z.string().optional().describe("The key of the status category."),
  name: z.string().optional().describe("The name of the status category."),
  self: z.string().optional().describe("The URL of the status category."),
}))

export const getStatusCategories = pikkuSessionlessFunc({
  description: "Returns a list of all status categories.\n\n**[Permissions](#permissions) required:** Permission to access Jira.",
  output: GetStatusCategoriesOutput,
  errors: [UnauthorizedError],
  func: async ({ jira }) => {
    return jira.call("GET", "/rest/api/3/statuscategory") as any
  },
})
