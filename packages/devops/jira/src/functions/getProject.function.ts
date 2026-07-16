// Projects — This resource represents projects. Use it to get, create, update, and delete projects. Also get statuses available to a project, a project's notification schemes, and update a project's type.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnauthorizedError, NotFoundError } from '@pikku/core/errors'

export const GetProjectInput = z.object({
  projectIdOrKey: z.string().describe("The project ID or project key (case sensitive)."),
  expand: z.string().optional().describe("Use [expand](#expansion) to include additional information in the response. This parameter accepts a comma-separated list. Note that the project description, issue types, and project lead are included in all responses by default. Expand options include:\n\n *  `description` The project description.\n *  `issueTypes` The issue types associated with the project.\n *  `lead` The project lead.\n *  `projectKeys` All project keys associated with the project.\n *  `issueTypeHierarchy` The project issue type hierarchy."),
  properties: z.array(z.string()).optional().describe("A list of project properties to return for the project. This parameter accepts a comma-separated list."),
})

export const GetProjectOutput = z.any()

export const getProject = pikkuSessionlessFunc({
  description: "Returns the [project details](https://confluence.atlassian.com/x/ahLpNw) for a project.\n\nThis operation can be accessed anonymously.\n\n**[Permissions](#permissions) required:** *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.",
  input: GetProjectInput,
  output: GetProjectOutput,
  errors: [UnauthorizedError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/project/{projectIdOrKey}", data) as any
  },
})
