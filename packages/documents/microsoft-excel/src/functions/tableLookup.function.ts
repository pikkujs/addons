import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const TableLookupInput = z.object({
  workbookId: z.string(),
  worksheetId: z.string(),
  tableId: z.string(),
  lookupColumn: z.string().optional(),
  lookupValue: z.string().optional(),
})

export const TableLookupOutput = z.record(z.string(), z.unknown())

export const tableLookup = pikkuSessionlessFunc({
  description: "Lookup a column",
  input: TableLookupInput,
  output: TableLookupOutput,
  func: async ({ microsoftExcel }, data) => {
    return microsoftExcel.call("GET", "/me/drive/items/{workbookId}/workbook/worksheets/{worksheetId}/tables/{tableId}/lookup", data) as any
  },
})
