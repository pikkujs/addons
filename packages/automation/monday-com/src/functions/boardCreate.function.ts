import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const BoardCreateInput = z.object({
  query: z.string().describe("The GraphQL query or mutation"),
  variables: z.record(z.string(), z.unknown()).optional().describe("GraphQL query variables"),
})

export const BoardCreateOutput = z.object({
  data: z.record(z.string(), z.unknown()).optional(),
})

export const boardCreate = pikkuSessionlessFunc({
  description: "Create a board",
  input: BoardCreateInput,
  output: BoardCreateOutput,
  func: async ({ mondayCom }, data) => {
    return mondayCom.call("POST", "/v2/boardCreate", data) as any
  },
})
