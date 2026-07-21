// Status — This resource represents statuses. Use it to search, get, create, delete, and change statuses.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError } from '@pikku/core/errors'

export const GetStatusesByIdInput = z.object({
  expand: z.string().optional().describe("Use [expand](#expansion) to include additional information in the response. This parameter accepts a comma-separated list. Expand options include:\n\n *  `usages` Returns the project and issue types that use the status in their workflow."),
  id: z.array(z.string()).optional().describe("The list of status IDs. To include multiple IDs, provide an ampersand-separated list. For example, id=10000&id=10001.\n\nMin items `1`, Max items `50`"),
})

export const GetStatusesByIdOutput = z.array(z.object({
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
}))

export const getStatusesById = pikkuSessionlessFunc({
  description: "Returns a list of the statuses specified by one or more status IDs.\n\n**[Permissions](#permissions) required:**\n\n *  *Administer projects* [project permission.](https://confluence.atlassian.com/x/yodKLg)\n *  *Administer Jira* [project permission.](https://confluence.atlassian.com/x/yodKLg)",
  input: GetStatusesByIdInput,
  output: GetStatusesByIdOutput,
  errors: [BadRequestError, UnauthorizedError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/statuses", data) as any
  },
})
