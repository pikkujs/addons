import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const BoardGroupCreateInput = z.object({
  query: z.string().describe("The GraphQL query or mutation"),
  variables: z.record(z.string(), z.unknown()).optional().describe("GraphQL query variables"),
})

export const BoardGroupCreateOutput = z.object({
  data: z.record(z.string(), z.unknown()).optional(),
})

export const boardGroupCreate = pikkuSessionlessFunc({
  description: "Create a board group",
  input: BoardGroupCreateInput,
  output: BoardGroupCreateOutput,
  func: async ({ mondayCom }, data) => {
    return mondayCom.call("POST", "/v2/boardGroupCreate", data) as any
  },
})
