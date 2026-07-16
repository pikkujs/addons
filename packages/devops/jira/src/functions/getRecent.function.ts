// Projects — This resource represents projects. Use it to get, create, update, and delete projects. Also get statuses available to a project, a project's notification schemes, and update a project's type.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError } from '@pikku/core/errors'

export const GetRecentInput = z.object({
  expand: z.string().optional().describe("Use [expand](#expansion) to include additional information in the response. This parameter accepts a comma-separated list. Expanded options include:\n\n *  `description` Returns the project description.\n *  `projectKeys` Returns all project keys associated with a project.\n *  `lead` Returns information about the project lead.\n *  `issueTypes` Returns all issue types associated with the project.\n *  `url` Returns the URL associated with the project.\n *  `permissions` Returns the permissions associated with the project.\n *  `insight` EXPERIMENTAL. Returns the insight details of total issue count and last issue update time for the project.\n *  `*` Returns the project with all available expand options."),
  properties: z.array(z.record(z.string(), z.unknown())).optional().describe("EXPERIMENTAL. A list of project properties to return for the project. This parameter accepts a comma-separated list. Invalid property names are ignored."),
})

export const GetRecentOutput = z.any()

export const getRecent = pikkuSessionlessFunc({
  description: "Returns a list of up to 20 projects recently viewed by the user that are still visible to the user.\n\nThis operation can be accessed anonymously.\n\n**[Permissions](#permissions) required:** Projects are returned only where the user has one of:\n\n *  *Browse Projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.\n *  *Administer Projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.\n *  *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: GetRecentInput,
  output: GetRecentOutput,
  errors: [BadRequestError, UnauthorizedError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/project/recent", data) as any
  },
})
