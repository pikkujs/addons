import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const WorksheetUpsertInput = z.object({
  workbookId: z.string(),
  worksheetId: z.string(),
  values: z.array(z.record(z.string(), z.unknown())).optional(),
})

export const WorksheetUpsertOutput = z.record(z.string(), z.unknown())

export const worksheetUpsert = pikkuSessionlessFunc({
  description: "Append or update a sheet",
  input: WorksheetUpsertInput,
  output: WorksheetUpsertOutput,
  func: async ({ microsoftExcel }, data) => {
    return microsoftExcel.call("PATCH", "/me/drive/items/{workbookId}/workbook/worksheets/{worksheetId}/range/upsert", data) as any
  },
})
