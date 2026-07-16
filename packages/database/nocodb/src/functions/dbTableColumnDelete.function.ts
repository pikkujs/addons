import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError } from '@pikku/core/errors'

export const DbTableColumnDeleteInput = z.object({
  columnId: z.string(),
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
})

export const dbTableColumnDelete = pikkuSessionlessFunc({
  description: "Delete the existing column by the given column ID",
  input: DbTableColumnDeleteInput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("DELETE", "/api/v1/db/meta/columns/{columnId}", data)
  },
})
