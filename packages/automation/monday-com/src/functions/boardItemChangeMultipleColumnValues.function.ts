import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const BoardItemChangeMultipleColumnValuesInput = z.object({
  query: z.string().describe("The GraphQL query or mutation"),
  variables: z.record(z.string(), z.unknown()).optional().describe("GraphQL query variables"),
})

export const BoardItemChangeMultipleColumnValuesOutput = z.object({
  data: z.record(z.string(), z.unknown()).optional(),
})

export const boardItemChangeMultipleColumnValues = pikkuSessionlessFunc({
  description: "Change multiple column values of an item",
  input: BoardItemChangeMultipleColumnValuesInput,
  output: BoardItemChangeMultipleColumnValuesOutput,
  func: async ({ mondayCom }, data) => {
    return mondayCom.call("POST", "/v2/boardItemChangeMultipleColumnValues", data) as any
  },
})
