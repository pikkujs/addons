import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const WorkbookGetAllInput = z.object({
  workbookId: z.string(),
})

export const WorkbookGetAllOutput = z.object({
  value: z.array(z.record(z.string(), z.unknown())).optional(),
})

export const workbookGetAll = pikkuSessionlessFunc({
  description: "Get workbooks",
  input: WorkbookGetAllInput,
  output: WorkbookGetAllOutput,
  func: async ({ microsoftExcel }, data) => {
    return microsoftExcel.call("GET", "/me/drive/items/{workbookId}/workbook/worksheets", data) as any
  },
})
