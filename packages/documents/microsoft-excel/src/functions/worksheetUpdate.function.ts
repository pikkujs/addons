import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const WorksheetUpdateInput = z.object({
  workbookId: z.string(),
  worksheetId: z.string(),
  values: z.array(z.record(z.string(), z.unknown())).optional(),
})

export const WorksheetUpdateOutput = z.record(z.string(), z.unknown())

export const worksheetUpdate = pikkuSessionlessFunc({
  description: "Update sheet",
  input: WorksheetUpdateInput,
  output: WorksheetUpdateOutput,
  func: async ({ microsoftExcel }, data) => {
    return microsoftExcel.call("PATCH", "/me/drive/items/{workbookId}/workbook/worksheets/{worksheetId}/range/update", data) as any
  },
})
