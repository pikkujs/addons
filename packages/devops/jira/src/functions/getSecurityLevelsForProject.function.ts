// Project permission schemes — This resource represents permission schemes for a project. Use this resource to: * get details of a project's issue security levels available to the calling user. * get the permission scheme associated with the project or assign different permission scheme to the project. * get details of a project's issue security scheme. See [Managing project permissions](https://confluence.atlassian.com/x/yodKLg) for more information about permission schemes.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { NotFoundError } from '@pikku/core/errors'

export const GetSecurityLevelsForProjectInput = z.object({
  projectKeyOrId: z.string().describe("The project ID or project key (case sensitive)."),
})

export const GetSecurityLevelsForProjectOutput = z.object({
  levels: z.array(z.object({
    description: z.string().optional().describe("The description of the issue level security item."),
    id: z.string().optional().describe("The ID of the issue level security item."),
    isDefault: z.boolean().optional().describe("Whether the issue level security item is the default."),
    issueSecuritySchemeId: z.string().optional().describe("The ID of the issue level security scheme."),
    name: z.string().optional().describe("The name of the issue level security item."),
    self: z.string().optional().describe("The URL of the issue level security item."),
  })).describe("Issue level security items list."),
}).describe("List of issue level security items in a project.")

export const getSecurityLevelsForProject = pikkuSessionlessFunc({
  description: "Returns all [issue security](https://confluence.atlassian.com/x/J4lKLg) levels for the project that the user has access to.\n\nThis operation can be accessed anonymously.\n\n**[Permissions](#permissions) required:** *Browse projects* [global permission](https://confluence.atlassian.com/x/x4dKLg) for the project, however, issue security levels are only returned for authenticated user with *Set Issue Security* [global permission](https://confluence.atlassian.com/x/x4dKLg) for the project.",
  input: GetSecurityLevelsForProjectInput,
  output: GetSecurityLevelsForProjectOutput,
  errors: [NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/project/{projectKeyOrId}/securitylevel", data) as any
  },
})
