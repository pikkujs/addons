// Issue security schemes — This resource represents issue security schemes. Use it to get an issue security scheme or list of issues security schemes. Issue security schemes control which users or groups of users can view an issue. When an issue security scheme is associated with a project, its security levels can be applied to issues in that project. Sub-tasks also inherit the security level of their parent issue.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const GetIssueSecuritySchemeInput = z.object({
  id: z.number().int().describe("The ID of the issue security scheme. Use the [Get issue security schemes](#api-rest-api-3-issuesecurityschemes-get) operation to get a list of issue security scheme IDs."),
})

export const GetIssueSecuritySchemeOutput = z.object({
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

export const getIssueSecurityScheme = pikkuSessionlessFunc({
  description: "Returns an issue security scheme along with its security levels.\n\n**[Permissions](#permissions) required:**\n\n *  *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).\n *  *Administer Projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for a project that uses the requested issue security scheme.",
  input: GetIssueSecuritySchemeInput,
  output: GetIssueSecuritySchemeOutput,
  errors: [UnauthorizedError, ForbiddenError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/issuesecurityschemes/{id}", data) as any
  },
})
