import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError } from '@pikku/core/errors'

export const DbDataTableBulkGroupListInput = z.object({
  tableId: z.string().describe("Table ID"),
  viewId: z.string().describe("View ID is required"),
  body: z.array(z.record(z.string(), z.unknown())),
})

export const DbDataTableBulkGroupListOutput = z.record(z.string(), z.unknown())

export const dbDataTableBulkGroupList = pikkuSessionlessFunc({
  description: "Read bulk group data from a given table with given filters",
  input: DbDataTableBulkGroupListInput,
  output: DbDataTableBulkGroupListOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("POST", "/api/v2/tables/{tableId}/bulk/group", data) as any
  },
})
