import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const BoardItemAddUpdateInput = z.object({
  query: z.string().describe("The GraphQL query or mutation"),
  variables: z.record(z.string(), z.unknown()).optional().describe("GraphQL query variables"),
})

export const BoardItemAddUpdateOutput = z.object({
  data: z.record(z.string(), z.unknown()).optional(),
})

export const boardItemAddUpdate = pikkuSessionlessFunc({
  description: "Add an update to an item",
  input: BoardItemAddUpdateInput,
  output: BoardItemAddUpdateOutput,
  func: async ({ mondayCom }, data) => {
    return mondayCom.call("POST", "/v2/boardItemAddUpdate", data) as any
  },
})
