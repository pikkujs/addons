import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const BoardItemGetAllInput = z.object({
  query: z.string().describe("The GraphQL query or mutation"),
  variables: z.record(z.string(), z.unknown()).optional().describe("GraphQL query variables"),
})

export const BoardItemGetAllOutput = z.object({
  data: z.record(z.string(), z.unknown()).optional(),
})

export const boardItemGetAll = pikkuSessionlessFunc({
  description: "Get many items",
  input: BoardItemGetAllInput,
  output: BoardItemGetAllOutput,
  func: async ({ mondayCom }, data) => {
    return mondayCom.call("POST", "/v2/boardItemGetAll", data) as any
  },
})
