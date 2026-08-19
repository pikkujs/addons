// Filters — This resource represents [filters](https://confluence.atlassian.com/x/eQiiLQ). Use it to get, create, update, or delete filters. Also use it to configure the columns for a filter and set favorite filters.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, ForbiddenError } from '@pikku/core/errors'

export const SetColumnsInput = z.object({
  id: z.number().int().describe("The ID of the filter."),
  body: z.array(z.string()),
})

export const SetColumnsOutput = z.unknown()

export const setColumns = pikkuSessionlessFunc({
  description: "Sets the columns for a filter. Only navigable fields can be set as columns. Use [Get fields](#api-rest-api-3-field-get) to get the list fields in Jira. A navigable field has `navigable` set to `true`.\n\nThe parameters for this resource are expressed as HTML form data. For example, in curl:\n\n`curl -X PUT -d columns=summary -d columns=description https://your-domain.atlassian.net/rest/api/3/filter/10000/columns`\n\n**[Permissions](#permissions) required:** Permission to access Jira, however, columns are only set for:\n\n *  filters owned by the user.\n *  filters shared with a group that the user is a member of.\n *  filters shared with a private project that the user has *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for.\n *  filters shared with a public project.\n *  filters shared with the public.",
  input: SetColumnsInput,
  output: SetColumnsOutput,
  errors: [BadRequestError, ForbiddenError],
  func: async ({ jira }, data) => {
    return jira.call("PUT", "/rest/api/3/filter/{id}/columns", data) as any
  },
})
