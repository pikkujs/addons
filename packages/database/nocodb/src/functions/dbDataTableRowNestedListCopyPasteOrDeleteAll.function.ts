import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'

export const DbDataTableRowNestedListCopyPasteOrDeleteAllInput = z.object({
  tableId: z.string().describe("Table ID"),
  viewId: z.string().optional().describe("View ID"),
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
  body: z.array(z.object({
  operation: z.enum(["copy", "paste", "deleteAll"]),
  rowId: z.string(),
  columnId: z.string(),
  fk_related_model_id: z.string(),
})).min(1).max(2),
})

export const DbDataTableRowNestedListCopyPasteOrDeleteAllOutput = z.unknown()

export const dbDataTableRowNestedListCopyPasteOrDeleteAll = pikkuSessionlessFunc({
  description: "Copy links from the one cell and paste them into another cell or delete all records from cell",
  input: DbDataTableRowNestedListCopyPasteOrDeleteAllInput,
  output: DbDataTableRowNestedListCopyPasteOrDeleteAllOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("POST", "/api/v2/tables/{tableId}/links/{columnId}/records", data) as any
  },
})
