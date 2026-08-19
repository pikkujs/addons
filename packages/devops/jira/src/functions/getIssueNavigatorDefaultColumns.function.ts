// Issue navigator settings — This resource represents issue navigator settings. Use it to get and set issue navigator default columns.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const GetIssueNavigatorDefaultColumnsOutput = z.array(z.object({
  label: z.string().optional().describe("The issue navigator column label."),
  value: z.string().optional().describe("The issue navigator column value."),
}))

export const getIssueNavigatorDefaultColumns = pikkuSessionlessFunc({
  description: "Returns the default issue navigator columns.\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  output: GetIssueNavigatorDefaultColumnsOutput,
  errors: [UnauthorizedError, ForbiddenError],
  func: async ({ jira }) => {
    return jira.call("GET", "/rest/api/3/settings/columns") as any
  },
})
