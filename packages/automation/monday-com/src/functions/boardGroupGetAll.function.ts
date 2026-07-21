import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const BoardGroupGetAllInput = z.object({
  query: z.string().describe("The GraphQL query or mutation"),
  variables: z.record(z.string(), z.unknown()).optional().describe("GraphQL query variables"),
})

export const BoardGroupGetAllOutput = z.object({
  data: z.record(z.string(), z.unknown()).optional(),
})

export const boardGroupGetAll = pikkuSessionlessFunc({
  description: "Get many board groups",
  input: BoardGroupGetAllInput,
  output: BoardGroupGetAllOutput,
  func: async ({ mondayCom }, data) => {
    return mondayCom.call("POST", "/v2/boardGroupGetAll", data) as any
  },
})
