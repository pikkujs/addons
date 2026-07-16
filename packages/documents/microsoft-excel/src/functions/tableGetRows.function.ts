import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const TableGetRowsInput = z.object({
  workbookId: z.string(),
  worksheetId: z.string(),
  tableId: z.string(),
})

export const TableGetRowsOutput = z.object({
  value: z.array(z.record(z.string(), z.unknown())).optional(),
})

export const tableGetRows = pikkuSessionlessFunc({
  description: "Get rows",
  input: TableGetRowsInput,
  output: TableGetRowsOutput,
  func: async ({ microsoftExcel }, data) => {
    return microsoftExcel.call("GET", "/me/drive/items/{workbookId}/workbook/worksheets/{worksheetId}/tables/{tableId}/rows", data) as any
  },
})
