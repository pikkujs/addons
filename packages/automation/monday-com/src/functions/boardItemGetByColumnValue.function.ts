import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const BoardItemGetByColumnValueInput = z.object({
  query: z.string().describe("The GraphQL query or mutation"),
  variables: z.record(z.string(), z.unknown()).optional().describe("GraphQL query variables"),
})

export const BoardItemGetByColumnValueOutput = z.object({
  data: z.record(z.string(), z.unknown()).optional(),
})

export const boardItemGetByColumnValue = pikkuSessionlessFunc({
  description: "Get items by column value",
  input: BoardItemGetByColumnValueInput,
  output: BoardItemGetByColumnValueOutput,
  func: async ({ mondayCom }, data) => {
    return mondayCom.call("POST", "/v2/boardItemGetByColumnValue", data) as any
  },
})
