// Status — This resource represents statuses. Use it to search, get, create, delete, and change statuses.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError } from '@pikku/core/errors'

export const SearchInput = z.object({
  expand: z.string().optional().describe("Use [expand](#expansion) to include additional information in the response. This parameter accepts a comma-separated list. Expand options include:\n\n *  `usages` Returns the project and issue types that use the status in their workflow."),
  projectId: z.string().optional().describe("The project the status is part of or null for global statuses."),
  startAt: z.number().int().optional().default(0).describe("The index of the first item to return in a page of results (page offset)."),
  maxResults: z.number().int().optional().default(200).describe("The maximum number of items to return per page."),
  searchString: z.string().max(255).optional().describe("Term to match status names against or null to search for all statuses in the search scope."),
  statusCategory: z.string().optional().describe("Category of the status to filter by. The supported values are: `TODO`, `IN_PROGRESS`, and `DONE`."),
})

export const SearchOutput = z.object({
  isLast: z.boolean().optional().describe("Whether this is the last page."),
  maxResults: z.number().int().optional().describe("The maximum number of items that could be returned."),
  nextPage: z.string().optional().describe("The URL of the next page of results, if any."),
  self: z.string().optional().describe("The URL of this page."),
  startAt: z.number().int().optional().describe("The index of the first item returned on the page."),
  total: z.number().int().optional().describe("Number of items that satisfy the search."),
  values: z.array(z.object({
    description: z.string().optional().describe("The description of the status."),
    id: z.string().optional().describe("The ID of the status."),
    name: z.string().optional().describe("The name of the status."),
    scope: z.object({
      project: z.object({
        id: z.string().describe("The ID of the project."),
      }).optional().describe("Project ID details."),
      type: z.enum(["PROJECT", "GLOBAL"]).describe("The scope of the status. `GLOBAL` for company-managed projects and `PROJECT` for team-managed projects."),
    }).optional().describe("The scope of the status."),
    statusCategory: z.enum(["TODO", "IN_PROGRESS", "DONE"]).optional().describe("The category of the status."),
    usages: z.array(z.object({
      issueTypes: z.array(z.string()).optional().describe("IDs of the issue types"),
      project: z.object({
        id: z.string().describe("The ID of the project."),
      }).optional().describe("Project ID details."),
    })).optional().describe("Projects and issue types where the status is used. Only available if the `usages` expand is requested."),
  })).optional().describe("The list of items."),
})

export const search = pikkuSessionlessFunc({
  description: "Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#pagination) list of statuses that match a search on name or project.\n\n**[Permissions](#permissions) required:**\n\n *  *Administer projects* [project permission.](https://confluence.atlassian.com/x/yodKLg)\n *  *Administer Jira* [project permission.](https://confluence.atlassian.com/x/yodKLg)",
  input: SearchInput,
  output: SearchOutput,
  errors: [BadRequestError, UnauthorizedError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/statuses/search", data) as any
  },
})
