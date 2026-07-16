import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const WorksheetClearInput = z.object({
  workbookId: z.string(),
  worksheetId: z.string(),
  applyTo: z.string().optional(),
})

export const WorksheetClearOutput = z.record(z.string(), z.unknown())

export const worksheetClear = pikkuSessionlessFunc({
  description: "Clear sheet",
  input: WorksheetClearInput,
  output: WorksheetClearOutput,
  func: async ({ microsoftExcel }, data) => {
    return microsoftExcel.call("POST", "/me/drive/items/{workbookId}/workbook/worksheets/{worksheetId}/range/clear", data) as any
  },
})
