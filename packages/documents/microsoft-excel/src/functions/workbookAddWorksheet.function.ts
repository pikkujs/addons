import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const WorkbookAddWorksheetInput = z.object({
  workbookId: z.string(),
  name: z.string().optional(),
})

export const WorkbookAddWorksheetOutput = z.record(z.string(), z.unknown())

export const workbookAddWorksheet = pikkuSessionlessFunc({
  description: "Add a sheet to a workbook",
  input: WorkbookAddWorksheetInput,
  output: WorkbookAddWorksheetOutput,
  func: async ({ microsoftExcel }, data) => {
    return microsoftExcel.call("POST", "/me/drive/items/{workbookId}/workbook/worksheets/add", data) as any
  },
})
