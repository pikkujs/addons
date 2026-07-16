import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const WorksheetGetAllInput = z.object({
  workbookId: z.string(),
})

export const WorksheetGetAllOutput = z.object({
  value: z.array(z.record(z.string(), z.unknown())).optional(),
})

export const worksheetGetAll = pikkuSessionlessFunc({
  description: "Get sheets",
  input: WorksheetGetAllInput,
  output: WorksheetGetAllOutput,
  func: async ({ microsoftExcel }, data) => {
    return microsoftExcel.call("GET", "/me/drive/items/{workbookId}/workbook/worksheets/list", data) as any
  },
})
