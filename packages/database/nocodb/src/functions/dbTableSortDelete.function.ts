import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError } from '@pikku/core/errors'

export const DbTableSortDeleteInput = z.object({
  sortId: z.string().describe("Unique Sort ID"),
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
})

export const DbTableSortDeleteOutput = z.boolean()

export const dbTableSortDelete = pikkuSessionlessFunc({
  description: "Delete the sort data by Sort ID",
  input: DbTableSortDeleteInput,
  output: DbTableSortDeleteOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("DELETE", "/api/v1/db/meta/sorts/{sortId}", data) as any
  },
})
