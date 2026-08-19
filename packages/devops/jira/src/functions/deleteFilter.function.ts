// Filters — This resource represents [filters](https://confluence.atlassian.com/x/eQiiLQ). Use it to get, create, update, or delete filters. Also use it to configure the columns for a filter and set favorite filters.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError } from '@pikku/core/errors'

export const DeleteFilterInput = z.object({
  id: z.number().int().describe("The ID of the filter to delete."),
})

export const deleteFilter = pikkuSessionlessFunc({
  description: "Delete a filter.\n\n**[Permissions](#permissions) required:** Permission to access Jira, however filters can only be deleted by the creator of the filter or a user with *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: DeleteFilterInput,
  errors: [BadRequestError, UnauthorizedError],
  func: async ({ jira }, data) => {
    return jira.call("DELETE", "/rest/api/3/filter/{id}", data)
  },
})
