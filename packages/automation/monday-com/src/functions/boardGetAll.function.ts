import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const BoardGetAllInput = z.object({
  query: z.string().describe("The GraphQL query or mutation"),
  variables: z.record(z.string(), z.unknown()).optional().describe("GraphQL query variables"),
})

export const BoardGetAllOutput = z.object({
  data: z.record(z.string(), z.unknown()).optional(),
})

export const boardGetAll = pikkuSessionlessFunc({
  description: "Get many boards",
  input: BoardGetAllInput,
  output: BoardGetAllOutput,
  func: async ({ mondayCom }, data) => {
    return mondayCom.call("POST", "/v2/boardGetAll", data) as any
  },
})
