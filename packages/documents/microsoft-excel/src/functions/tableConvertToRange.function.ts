import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const TableConvertToRangeInput = z.object({
  workbookId: z.string(),
  worksheetId: z.string(),
  tableId: z.string(),
})

export const TableConvertToRangeOutput = z.record(z.string(), z.unknown())

export const tableConvertToRange = pikkuSessionlessFunc({
  description: "Convert to range",
  input: TableConvertToRangeInput,
  output: TableConvertToRangeOutput,
  func: async ({ microsoftExcel }, data) => {
    return microsoftExcel.call("POST", "/me/drive/items/{workbookId}/workbook/worksheets/{worksheetId}/tables/{tableId}/convertToRange", data) as any
  },
})
