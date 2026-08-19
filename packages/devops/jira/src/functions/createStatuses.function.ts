// Status — This resource represents statuses. Use it to search, get, create, delete, and change statuses.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError } from '@pikku/core/errors'

export const CreateStatusesInput = z.object({
  scope: z.object({
  project: z.object({
    id: z.string().describe("The ID of the project."),
  }).optional().describe("Project ID details."),
  type: z.enum(["PROJECT", "GLOBAL"]).describe("The scope of the status. `GLOBAL` for company-managed projects and `PROJECT` for team-managed projects."),
}).describe("The scope of the status."),
  statuses: z.array(z.object({
  description: z.string().optional().describe("The description of the status."),
  name: z.string().max(255).describe("The name of the status."),
  statusCategory: z.enum(["TODO", "IN_PROGRESS", "DONE"]).describe("The category of the status."),
})).describe("Details of the statuses being created."),
})

export const CreateStatusesOutput = z.array(z.object({
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

export const createStatuses = pikkuSessionlessFunc({
  description: "Creates statuses for a global or project scope.\n\n**[Permissions](#permissions) required:**\n\n *  *Administer projects* [project permission.](https://confluence.atlassian.com/x/yodKLg)\n *  *Administer Jira* [project permission.](https://confluence.atlassian.com/x/yodKLg)",
  input: CreateStatusesInput,
  output: CreateStatusesOutput,
  errors: [BadRequestError, UnauthorizedError],
  func: async ({ jira }, data) => {
    return jira.call("POST", "/rest/api/3/statuses", data) as any
  },
})
