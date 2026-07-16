// Filters — This resource represents [filters](https://confluence.atlassian.com/x/eQiiLQ). Use it to get, create, update, or delete filters. Also use it to configure the columns for a filter and set favorite filters.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError } from '@pikku/core/errors'

export const ResetColumnsInput = z.object({
  id: z.number().int().describe("The ID of the filter."),
})

export const resetColumns = pikkuSessionlessFunc({
  description: "Reset the user's column configuration for the filter to the default.\n\n**[Permissions](#permissions) required:** Permission to access Jira, however, columns are only reset for:\n\n *  filters owned by the user.\n *  filters shared with a group that the user is a member of.\n *  filters shared with a private project that the user has *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for.\n *  filters shared with a public project.\n *  filters shared with the public.",
  input: ResetColumnsInput,
  errors: [BadRequestError, UnauthorizedError],
  func: async ({ jira }, data) => {
    return jira.call("DELETE", "/rest/api/3/filter/{id}/columns", data)
  },
})
