import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const BoardItemGetInput = z.object({
  query: z.string().describe("The GraphQL query or mutation"),
  variables: z.record(z.string(), z.unknown()).optional().describe("GraphQL query variables"),
})

export const BoardItemGetOutput = z.object({
  data: z.record(z.string(), z.unknown()).optional(),
})

export const boardItemGet = pikkuSessionlessFunc({
  description: "Get an item",
  input: BoardItemGetInput,
  output: BoardItemGetOutput,
  func: async ({ mondayCom }, data) => {
    return mondayCom.call("POST", "/v2/boardItemGet", data) as any
  },
})
