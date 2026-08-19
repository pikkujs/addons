import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ListCreateInput = z.object({
  folderId: z.string(),
  name: z.string().optional(),
  content: z.string().optional(),
})

export const ListCreateOutput = z.record(z.string(), z.unknown())

export const listCreate = pikkuSessionlessFunc({
  description: "List create",
  input: ListCreateInput,
  output: ListCreateOutput,
  func: async ({ clickup }, data) => {
    return clickup.call("POST", "/folder/{folderId}/list", data) as any
  },
})
