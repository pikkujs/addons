import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const BoardItemChangeColumnValueInput = z.object({
  query: z.string().describe("The GraphQL query or mutation"),
  variables: z.record(z.string(), z.unknown()).optional().describe("GraphQL query variables"),
})

export const BoardItemChangeColumnValueOutput = z.object({
  data: z.record(z.string(), z.unknown()).optional(),
})

export const boardItemChangeColumnValue = pikkuSessionlessFunc({
  description: "Change a column value of an item",
  input: BoardItemChangeColumnValueInput,
  output: BoardItemChangeColumnValueOutput,
  func: async ({ mondayCom }, data) => {
    return mondayCom.call("POST", "/v2/boardItemChangeColumnValue", data) as any
  },
})
