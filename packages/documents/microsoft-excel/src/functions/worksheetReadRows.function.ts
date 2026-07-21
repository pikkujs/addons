import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const WorksheetReadRowsInput = z.object({
  workbookId: z.string(),
  worksheetId: z.string(),
})

export const WorksheetReadRowsOutput = z.record(z.string(), z.unknown())

export const worksheetReadRows = pikkuSessionlessFunc({
  description: "Get rows from sheet",
  input: WorksheetReadRowsInput,
  output: WorksheetReadRowsOutput,
  func: async ({ microsoftExcel }, data) => {
    return microsoftExcel.call("GET", "/me/drive/items/{workbookId}/workbook/worksheets/{worksheetId}/usedRange", data) as any
  },
})
