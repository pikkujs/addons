// Status — This resource represents statuses. Use it to search, get, create, delete, and change statuses.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError } from '@pikku/core/errors'

export const DeleteStatusesByIdInput = z.object({
  id: z.array(z.string()).optional().describe("The list of status IDs. To include multiple IDs, provide an ampersand-separated list. For example, id=10000&id=10001.\n\nMin items `1`, Max items `50`"),
})

export const DeleteStatusesByIdOutput = z.unknown()

export const deleteStatusesById = pikkuSessionlessFunc({
  description: "Deletes statuses by ID.\n\n**[Permissions](#permissions) required:**\n\n *  *Administer projects* [project permission.](https://confluence.atlassian.com/x/yodKLg)\n *  *Administer Jira* [project permission.](https://confluence.atlassian.com/x/yodKLg)",
  input: DeleteStatusesByIdInput,
  output: DeleteStatusesByIdOutput,
  errors: [BadRequestError, UnauthorizedError],
  func: async ({ jira }, data) => {
    return jira.call("DELETE", "/rest/api/3/statuses", data) as any
  },
})
