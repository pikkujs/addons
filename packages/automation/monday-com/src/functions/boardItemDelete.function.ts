import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const BoardItemDeleteInput = z.object({
  query: z.string().describe("The GraphQL query or mutation"),
  variables: z.record(z.string(), z.unknown()).optional().describe("GraphQL query variables"),
})

export const BoardItemDeleteOutput = z.object({
  data: z.record(z.string(), z.unknown()).optional(),
})

export const boardItemDelete = pikkuSessionlessFunc({
  description: "Delete an item",
  input: BoardItemDeleteInput,
  output: BoardItemDeleteOutput,
  func: async ({ mondayCom }, data) => {
    return mondayCom.call("POST", "/v2/boardItemDelete", data) as any
  },
})
