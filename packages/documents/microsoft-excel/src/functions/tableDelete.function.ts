import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const TableDeleteInput = z.object({
  workbookId: z.string(),
  worksheetId: z.string(),
  tableId: z.string(),
})

export const TableDeleteOutput = z.record(z.string(), z.unknown())

export const tableDelete = pikkuSessionlessFunc({
  description: "Delete a table",
  input: TableDeleteInput,
  output: TableDeleteOutput,
  func: async ({ microsoftExcel }, data) => {
    return microsoftExcel.call("DELETE", "/me/drive/items/{workbookId}/workbook/worksheets/{worksheetId}/tables/{tableId}", data) as any
  },
})
