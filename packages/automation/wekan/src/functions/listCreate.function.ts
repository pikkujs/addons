import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ListCreateInput = z.object({
  boardId: z.string(),
  title: z.string().optional(),
})

export const ListCreateOutput = z.record(z.string(), z.unknown())

export const listCreate = pikkuSessionlessFunc({
  description: "Create a list",
  input: ListCreateInput,
  output: ListCreateOutput,
  func: async ({ wekan }, data) => {
    return wekan.call("POST", "/boards/{boardId}/lists", data) as any
  },
})
