// Filters — This resource represents [filters](https://confluence.atlassian.com/x/eQiiLQ). Use it to get, create, update, or delete filters. Also use it to configure the columns for a filter and set favorite filters.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const ChangeFilterOwnerInput = z.object({
  id: z.number().int().describe("The ID of the filter to update."),
  accountId: z.string().describe("The account ID of the new owner."),
})

export const ChangeFilterOwnerOutput = z.unknown()

export const changeFilterOwner = pikkuSessionlessFunc({
  description: "Changes the owner of the filter.\n\n**[Permissions](#permissions) required:** Permission to access Jira. However, the user must own the filter or have the *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: ChangeFilterOwnerInput,
  output: ChangeFilterOwnerOutput,
  errors: [BadRequestError, ForbiddenError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("PUT", "/rest/api/3/filter/{id}/owner", data) as any
  },
})
