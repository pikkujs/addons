import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const DbTableColumnHashInput = z.object({
  tableId: z.string().min(0).max(20).describe("Model for ID").describe("Unique Table ID"),
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
})

export const DbTableColumnHashOutput = z.object({
  hash: z.string().optional().describe("Columns hash"),
})

export const dbTableColumnHash = pikkuSessionlessFunc({
  description: "Get columns hash for table",
  input: DbTableColumnHashInput,
  output: DbTableColumnHashOutput,
  func: async ({ nocodb }, data) => {
    return nocodb.call("GET", "/api/v1/db/meta/tables/{tableId}/columns/hash", data) as any
  },
})
