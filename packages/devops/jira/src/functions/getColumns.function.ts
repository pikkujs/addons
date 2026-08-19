// Filters — This resource represents [filters](https://confluence.atlassian.com/x/eQiiLQ). Use it to get, create, update, or delete filters. Also use it to configure the columns for a filter and set favorite filters.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, NotFoundError } from '@pikku/core/errors'

export const GetColumnsInput = z.object({
  id: z.number().int().describe("The ID of the filter."),
})

export const GetColumnsOutput = z.array(z.object({
  label: z.string().optional().describe("The issue navigator column label."),
  value: z.string().optional().describe("The issue navigator column value."),
}))

export const getColumns = pikkuSessionlessFunc({
  description: "Returns the columns configured for a filter. The column configuration is used when the filter's results are viewed in *List View* with the *Columns* set to *Filter*.\n\nThis operation can be accessed anonymously.\n\n**[Permissions](#permissions) required:** None, however, column details are only returned for:\n\n *  filters owned by the user.\n *  filters shared with a group that the user is a member of.\n *  filters shared with a private project that the user has *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for.\n *  filters shared with a public project.\n *  filters shared with the public.",
  input: GetColumnsInput,
  output: GetColumnsOutput,
  errors: [BadRequestError, UnauthorizedError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/filter/{id}/columns", data) as any
  },
})
