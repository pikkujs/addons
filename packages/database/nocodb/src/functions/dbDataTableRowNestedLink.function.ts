import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError } from '@pikku/core/errors'

export const DbDataTableRowNestedLinkInput = z.object({
  tableId: z.string().describe("Table ID"),
  viewId: z.string().optional().describe("View ID"),
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
  body: z.union([z.record(z.string(), z.unknown()), z.array(z.record(z.string(), z.unknown()))]),
})

export const DbDataTableRowNestedLinkOutput = z.unknown()

export const dbDataTableRowNestedLink = pikkuSessionlessFunc({
  description: "Create a link with the row.",
  input: DbDataTableRowNestedLinkInput,
  output: DbDataTableRowNestedLinkOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("POST", "/api/v2/tables/{tableId}/links/{columnId}/records/{rowId}", data) as any
  },
})
