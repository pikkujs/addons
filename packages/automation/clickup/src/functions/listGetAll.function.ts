import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ListGetAllInput = z.object({
  folderId: z.string(),
  archived: z.boolean().optional(),
})

export const ListGetAllOutput = z.record(z.string(), z.unknown())

export const listGetAll = pikkuSessionlessFunc({
  description: "List get all",
  input: ListGetAllInput,
  output: ListGetAllOutput,
  func: async ({ clickup }, data) => {
    return clickup.call("GET", "/folder/{folderId}/list", data) as any
  },
})
