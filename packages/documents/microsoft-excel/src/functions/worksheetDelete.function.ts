import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const WorksheetDeleteInput = z.object({
  workbookId: z.string(),
  worksheetId: z.string(),
})

export const WorksheetDeleteOutput = z.record(z.string(), z.unknown())

export const worksheetDelete = pikkuSessionlessFunc({
  description: "Delete sheet",
  input: WorksheetDeleteInput,
  output: WorksheetDeleteOutput,
  func: async ({ microsoftExcel }, data) => {
    return microsoftExcel.call("DELETE", "/me/drive/items/{workbookId}/workbook/worksheets/{worksheetId}", data) as any
  },
})
