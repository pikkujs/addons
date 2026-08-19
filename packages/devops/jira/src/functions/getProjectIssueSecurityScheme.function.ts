// Project permission schemes — This resource represents permission schemes for a project. Use this resource to: * get details of a project's issue security levels available to the calling user. * get the permission scheme associated with the project or assign different permission scheme to the project. * get details of a project's issue security scheme. See [Managing project permissions](https://confluence.atlassian.com/x/yodKLg) for more information about permission schemes.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const GetProjectIssueSecuritySchemeInput = z.object({
  projectKeyOrId: z.string().describe("The project ID or project key (case sensitive)."),
})

export const GetProjectIssueSecuritySchemeOutput = z.object({
  defaultSecurityLevelId: z.number().int().optional().describe("The ID of the default security level."),
  description: z.string().optional().describe("The description of the issue security scheme."),
  id: z.number().int().optional().describe("The ID of the issue security scheme."),
  levels: z.array(z.object({
    description: z.string().optional().describe("The description of the issue level security item."),
    id: z.string().optional().describe("The ID of the issue level security item."),
    isDefault: z.boolean().optional().describe("Whether the issue level security item is the default."),
    issueSecuritySchemeId: z.string().optional().describe("The ID of the issue level security scheme."),
    name: z.string().optional().describe("The name of the issue level security item."),
    self: z.string().optional().describe("The URL of the issue level security item."),
  })).optional(),
  name: z.string().optional().describe("The name of the issue security scheme."),
  self: z.string().optional().describe("The URL of the issue security scheme."),
}).describe("Details about a security scheme.")

export const getProjectIssueSecurityScheme = pikkuSessionlessFunc({
  description: "Returns the [issue security scheme](https://confluence.atlassian.com/x/J4lKLg) associated with the project.\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg) or the *Administer Projects* [project permission](https://confluence.atlassian.com/x/yodKLg).",
  input: GetProjectIssueSecuritySchemeInput,
  output: GetProjectIssueSecuritySchemeOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/project/{projectKeyOrId}/issuesecuritylevelscheme", data) as any
  },
})
