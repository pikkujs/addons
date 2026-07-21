import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const WorksheetAppendInput = z.object({
  workbookId: z.string(),
  worksheetId: z.string(),
  values: z.array(z.record(z.string(), z.unknown())).optional(),
})

export const WorksheetAppendOutput = z.record(z.string(), z.unknown())

export const worksheetAppend = pikkuSessionlessFunc({
  description: "Append data to sheet",
  input: WorksheetAppendInput,
  output: WorksheetAppendOutput,
  func: async ({ microsoftExcel }, data) => {
    return microsoftExcel.call("PATCH", "/me/drive/items/{workbookId}/workbook/worksheets/{worksheetId}/append", data) as any
  },
})
