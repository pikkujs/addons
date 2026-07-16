import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const WorkbookDeleteInput = z.object({
  workbookId: z.string(),
})

export const WorkbookDeleteOutput = z.record(z.string(), z.unknown())

export const workbookDelete = pikkuSessionlessFunc({
  description: "Delete workbook",
  input: WorkbookDeleteInput,
  output: WorkbookDeleteOutput,
  func: async ({ microsoftExcel }, data) => {
    return microsoftExcel.call("DELETE", "/me/drive/items/{workbookId}", data) as any
  },
})
