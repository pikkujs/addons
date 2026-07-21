import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const BoardGroupDeleteInput = z.object({
  query: z.string().describe("The GraphQL query or mutation"),
  variables: z.record(z.string(), z.unknown()).optional().describe("GraphQL query variables"),
})

export const BoardGroupDeleteOutput = z.object({
  data: z.record(z.string(), z.unknown()).optional(),
})

export const boardGroupDelete = pikkuSessionlessFunc({
  description: "Delete a board group",
  input: BoardGroupDeleteInput,
  output: BoardGroupDeleteOutput,
  func: async ({ mondayCom }, data) => {
    return mondayCom.call("POST", "/v2/boardGroupDelete", data) as any
  },
})
