import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'

export const DbTableColumnPrimaryColumnSetInput = z.object({
  columnId: z.string(),
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
})

export const DbTableColumnPrimaryColumnSetOutput = z.boolean()

export const dbTableColumnPrimaryColumnSet = pikkuSessionlessFunc({
  description: "Set a primary value on a given column",
  input: DbTableColumnPrimaryColumnSetInput,
  output: DbTableColumnPrimaryColumnSetOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("POST", "/api/v1/db/meta/columns/{columnId}/primary", data) as any
  },
})
