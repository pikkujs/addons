import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const BoardColumnCreateInput = z.object({
  query: z.string().describe("The GraphQL query or mutation"),
  variables: z.record(z.string(), z.unknown()).optional().describe("GraphQL query variables"),
})

export const BoardColumnCreateOutput = z.object({
  data: z.record(z.string(), z.unknown()).optional(),
})

export const boardColumnCreate = pikkuSessionlessFunc({
  description: "Create a board column",
  input: BoardColumnCreateInput,
  output: BoardColumnCreateOutput,
  func: async ({ mondayCom }, data) => {
    return mondayCom.call("POST", "/v2/boardColumnCreate", data) as any
  },
})
