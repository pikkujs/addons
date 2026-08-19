import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const TableAppendInput = z.object({
  workbookId: z.string(),
  worksheetId: z.string(),
  tableId: z.string(),
  values: z.array(z.record(z.string(), z.unknown())).optional(),
})

export const TableAppendOutput = z.record(z.string(), z.unknown())

export const tableAppend = pikkuSessionlessFunc({
  description: "Append rows to table",
  input: TableAppendInput,
  output: TableAppendOutput,
  func: async ({ microsoftExcel }, data) => {
    return microsoftExcel.call("POST", "/me/drive/items/{workbookId}/workbook/worksheets/{worksheetId}/tables/{tableId}/rows/add", data) as any
  },
})
