import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'

export const DbTableFilterDeleteInput = z.object({
  filterId: z.string().min(0).max(20).regex(new RegExp("fi_pgfuo11uhn2xeo")).describe("Model for ID").describe("Unique Filter ID"),
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
})

export const DbTableFilterDeleteOutput = z.boolean()

export const dbTableFilterDelete = pikkuSessionlessFunc({
  description: "Delete the filter data with a given Filter ID",
  input: DbTableFilterDeleteInput,
  output: DbTableFilterDeleteOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("DELETE", "/api/v1/db/meta/filters/{filterId}", data) as any
  },
})
