// Issue security level — This resource represents issue security levels. Use it to obtain the details of any issue security level. For more information about issue security levels, see [Configuring issue-level security](https://confluence.atlassian.com/x/J4lKLg).

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { UnauthorizedError, NotFoundError } from '@pikku/core/errors'

export const GetIssueSecurityLevelInput = z.object({
  id: z.string().describe("The ID of the issue security level."),
})

export const GetIssueSecurityLevelOutput = z.object({
  description: z.string().optional().describe("The description of the issue level security item."),
  id: z.string().optional().describe("The ID of the issue level security item."),
  isDefault: z.boolean().optional().describe("Whether the issue level security item is the default."),
  issueSecuritySchemeId: z.string().optional().describe("The ID of the issue level security scheme."),
  name: z.string().optional().describe("The name of the issue level security item."),
  self: z.string().optional().describe("The URL of the issue level security item."),
}).describe("Details of an issue level security item.")

export const getIssueSecurityLevel = pikkuSessionlessFunc({
  description: "Returns details of an issue security level.\n\nUse [Get issue security scheme](#api-rest-api-3-issuesecurityschemes-id-get) to obtain the IDs of issue security levels associated with the issue security scheme.\n\nThis operation can be accessed anonymously.\n\n**[Permissions](#permissions) required:** None.",
  input: GetIssueSecurityLevelInput,
  output: GetIssueSecurityLevelOutput,
  errors: [UnauthorizedError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/securitylevel/{id}", data) as any
  },
})
