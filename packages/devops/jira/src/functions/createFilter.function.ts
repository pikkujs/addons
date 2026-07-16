// Filters — This resource represents [filters](https://confluence.atlassian.com/x/eQiiLQ). Use it to get, create, update, or delete filters. Also use it to configure the columns for a filter and set favorite filters.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError } from '@pikku/core/errors'

export const CreateFilterInput = z.any()

export const CreateFilterOutput = z.any()

export const createFilter = pikkuSessionlessFunc({
  description: "Creates a filter. The filter is shared according to the [default share scope](#api-rest-api-3-filter-post). The filter is not selected as a favorite.\n\n**[Permissions](#permissions) required:** Permission to access Jira.",
  input: CreateFilterInput,
  output: CreateFilterOutput,
  errors: [BadRequestError, UnauthorizedError],
  func: async ({ jira }, data) => {
    return jira.call("POST", "/rest/api/3/filter", data) as any
  },
})
