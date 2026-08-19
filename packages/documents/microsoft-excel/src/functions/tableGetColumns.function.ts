import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const TableGetColumnsInput = z.object({
  workbookId: z.string(),
  worksheetId: z.string(),
  tableId: z.string(),
})

export const TableGetColumnsOutput = z.object({
  value: z.array(z.record(z.string(), z.unknown())).optional(),
})

export const tableGetColumns = pikkuSessionlessFunc({
  description: "Get columns",
  input: TableGetColumnsInput,
  output: TableGetColumnsOutput,
  func: async ({ microsoftExcel }, data) => {
    return microsoftExcel.call("GET", "/me/drive/items/{workbookId}/workbook/worksheets/{worksheetId}/tables/{tableId}/columns", data) as any
  },
})
