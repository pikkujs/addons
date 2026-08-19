import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'

export const BaseHasEmptyOrNullFiltersInput = z.object({
  baseId: z.string().min(0).max(20).describe("Model for ID").describe("Unique Base ID"),
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
})

export const BaseHasEmptyOrNullFiltersOutput = z.unknown()

export const baseHasEmptyOrNullFilters = pikkuSessionlessFunc({
  description: "Check if a base contains empty and null filters. Used in `Show NULL and EMPTY in Filter` in Base Setting.",
  input: BaseHasEmptyOrNullFiltersInput,
  output: BaseHasEmptyOrNullFiltersOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("GET", "/api/v1/db/meta/projects/{baseId}/has-empty-or-null-filters", data) as any
  },
})
