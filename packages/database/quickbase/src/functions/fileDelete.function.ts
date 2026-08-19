import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const FileDeleteInput = z.object({
  tableId: z.string(),
  recordId: z.string(),
  fieldId: z.string(),
  versionNumber: z.string(),
})

export const FileDeleteOutput = z.record(z.string(), z.unknown())

export const fileDelete = pikkuSessionlessFunc({
  description: "Delete a file",
  input: FileDeleteInput,
  output: FileDeleteOutput,
  func: async ({ quickbase }, data) => {
    return quickbase.call("DELETE", "/files/{tableId}/{recordId}/{fieldId}/{versionNumber}", data) as any
  },
})
