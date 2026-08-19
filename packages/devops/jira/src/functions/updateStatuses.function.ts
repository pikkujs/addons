// Status — This resource represents statuses. Use it to search, get, create, delete, and change statuses.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError } from '@pikku/core/errors'

export const UpdateStatusesInput = z.object({
  statuses: z.array(z.object({
  description: z.string().optional().describe("The description of the status."),
  id: z.string().describe("The ID of the status."),
  name: z.string().describe("The name of the status."),
  statusCategory: z.enum(["TODO", "IN_PROGRESS", "DONE"]).describe("The category of the status."),
})).optional().describe("The list of statuses that will be updated."),
})

export const UpdateStatusesOutput = z.unknown()

export const updateStatuses = pikkuSessionlessFunc({
  description: "Updates statuses by ID.\n\n**[Permissions](#permissions) required:**\n\n *  *Administer projects* [project permission.](https://confluence.atlassian.com/x/yodKLg)\n *  *Administer Jira* [project permission.](https://confluence.atlassian.com/x/yodKLg)",
  input: UpdateStatusesInput,
  output: UpdateStatusesOutput,
  errors: [BadRequestError, UnauthorizedError],
  func: async ({ jira }, data) => {
    return jira.call("PUT", "/rest/api/3/statuses", data) as any
  },
})
