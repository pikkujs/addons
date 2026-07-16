// Filter sharing — This resource represents options for sharing [filters](#api-group-Filters). Use it to get share scopes as well as add and remove share scopes from filters.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnauthorizedError, NotFoundError } from '@pikku/core/errors'

export const DeleteSharePermissionInput = z.object({
  id: z.number().int().describe("The ID of the filter."),
  permissionId: z.number().int().describe("The ID of the share permission."),
})

export const deleteSharePermission = pikkuSessionlessFunc({
  description: "Deletes a share permission from a filter.\n\n**[Permissions](#permissions) required:** Permission to access Jira and the user must own the filter.",
  input: DeleteSharePermissionInput,
  errors: [UnauthorizedError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("DELETE", "/rest/api/3/filter/{id}/permission/{permissionId}", data)
  },
})
