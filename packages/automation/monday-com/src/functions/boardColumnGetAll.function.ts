import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const BoardColumnGetAllInput = z.object({
  query: z.string().describe("The GraphQL query or mutation"),
  variables: z.record(z.string(), z.unknown()).optional().describe("GraphQL query variables"),
})

export const BoardColumnGetAllOutput = z.object({
  data: z.record(z.string(), z.unknown()).optional(),
})

export const boardColumnGetAll = pikkuSessionlessFunc({
  description: "Get many board columns",
  input: BoardColumnGetAllInput,
  output: BoardColumnGetAllOutput,
  func: async ({ mondayCom }, data) => {
    return mondayCom.call("POST", "/v2/boardColumnGetAll", data) as any
  },
})
