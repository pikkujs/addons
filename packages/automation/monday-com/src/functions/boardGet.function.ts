import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const BoardGetInput = z.object({
  query: z.string().describe("The GraphQL query or mutation"),
  variables: z.record(z.string(), z.unknown()).optional().describe("GraphQL query variables"),
})

export const BoardGetOutput = z.object({
  data: z.record(z.string(), z.unknown()).optional(),
})

export const boardGet = pikkuSessionlessFunc({
  description: "Get a board",
  input: BoardGetInput,
  output: BoardGetOutput,
  func: async ({ mondayCom }, data) => {
    return mondayCom.call("POST", "/v2/boardGet", data) as any
  },
})
