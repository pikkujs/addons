import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'

export const DbTableDeleteInput = z.object({
  tableId: z.string().min(0).max(20).describe("Model for ID").describe("Unique Table ID"),
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
})

export const DbTableDeleteOutput = z.boolean()

export const dbTableDelete = pikkuSessionlessFunc({
  description: "Delete the table meta data by the given table ID",
  input: DbTableDeleteInput,
  output: DbTableDeleteOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("DELETE", "/api/v1/db/meta/tables/{tableId}", data) as any
  },
})
