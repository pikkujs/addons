import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const CreateInput = z.object({
  docId: z.string(),
  tableId: z.string(),
  records: z.array(z.record(z.string(), z.unknown())).optional(),
})

export const CreateOutput = z.object({
  records: z.array(z.record(z.string(), z.unknown())).optional(),
})

export const create = pikkuSessionlessFunc({
  description: "Create rows in a table",
  input: CreateInput,
  output: CreateOutput,
  func: async ({ grist }, data) => {
    return grist.call("POST", "/docs/{docId}/tables/{tableId}/records", data) as any
  },
})
