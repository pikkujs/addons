// Projects — This resource represents projects. Use it to get, create, update, and delete projects. Also get statuses available to a project, a project's notification schemes, and update a project's type.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { UnauthorizedError, NotFoundError } from '@pikku/core/errors'

export const GetAllStatusesInput = z.object({
  projectIdOrKey: z.string().describe("The project ID or project key (case sensitive)."),
})

export const GetAllStatusesOutput = z.array(z.object({
  id: z.string().describe("The ID of the issue type."),
  name: z.string().describe("The name of the issue type."),
  self: z.string().describe("The URL of the issue type's status details."),
  statuses: z.array(z.object({
    description: z.string().optional().describe("The description of the status."),
    iconUrl: z.string().optional().describe("The URL of the icon used to represent the status."),
    id: z.string().optional().describe("The ID of the status."),
    name: z.string().optional().describe("The name of the status."),
    self: z.string().optional().describe("The URL of the status."),
    statusCategory: z.object({
      colorName: z.string().optional().describe("The name of the color used to represent the status category."),
      id: z.number().int().optional().describe("The ID of the status category."),
      key: z.string().optional().describe("The key of the status category."),
      name: z.string().optional().describe("The name of the status category."),
      self: z.string().optional().describe("The URL of the status category."),
    }).optional().describe("The category assigned to the status."),
  })).describe("List of status details for the issue type."),
  subtask: z.boolean().describe("Whether this issue type represents subtasks."),
}))

export const getAllStatuses = pikkuSessionlessFunc({
  description: "Returns the valid statuses for a project. The statuses are grouped by issue type, as each project has a set of valid issue types and each issue type has a set of valid statuses.\n\nThis operation can be accessed anonymously.\n\n**[Permissions](#permissions) required:** *Browse Projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.",
  input: GetAllStatusesInput,
  output: GetAllStatusesOutput,
  errors: [UnauthorizedError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/project/{projectIdOrKey}/statuses", data) as any
  },
})
