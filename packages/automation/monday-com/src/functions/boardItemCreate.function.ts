import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const BoardItemCreateInput = z.object({
  query: z.string().describe("The GraphQL query or mutation"),
  variables: z.record(z.string(), z.unknown()).optional().describe("GraphQL query variables"),
})

export const BoardItemCreateOutput = z.object({
  data: z.record(z.string(), z.unknown()).optional(),
})

export const boardItemCreate = pikkuSessionlessFunc({
  description: "Create an item",
  input: BoardItemCreateInput,
  output: BoardItemCreateOutput,
  func: async ({ mondayCom }, data) => {
    return mondayCom.call("POST", "/v2/boardItemCreate", data) as any
  },
})
