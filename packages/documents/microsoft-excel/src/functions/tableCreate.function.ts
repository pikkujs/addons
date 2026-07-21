import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const TableCreateInput = z.object({
  workbookId: z.string(),
  worksheetId: z.string(),
  address: z.string().optional(),
  hasHeaders: z.boolean().optional(),
})

export const TableCreateOutput = z.record(z.string(), z.unknown())

export const tableCreate = pikkuSessionlessFunc({
  description: "Create a table",
  input: TableCreateInput,
  output: TableCreateOutput,
  func: async ({ microsoftExcel }, data) => {
    return microsoftExcel.call("POST", "/me/drive/items/{workbookId}/workbook/worksheets/{worksheetId}/tables/add", data) as any
  },
})
