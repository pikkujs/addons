// Filters — This resource represents [filters](https://confluence.atlassian.com/x/eQiiLQ). Use it to get, create, update, or delete filters. Also use it to configure the columns for a filter and set favorite filters.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError } from '@pikku/core/errors'

export const UpdateFilterInput = z.any()

export const UpdateFilterOutput = z.any()

export const updateFilter = pikkuSessionlessFunc({
  description: "Updates a filter. Use this operation to update a filter's name, description, JQL, or sharing.\n\n**[Permissions](#permissions) required:** Permission to access Jira, however the user must own the filter.",
  input: UpdateFilterInput,
  output: UpdateFilterOutput,
  errors: [BadRequestError, UnauthorizedError],
  func: async ({ jira }, data) => {
    return jira.call("PUT", "/rest/api/3/filter/{id}", data) as any
  },
})
