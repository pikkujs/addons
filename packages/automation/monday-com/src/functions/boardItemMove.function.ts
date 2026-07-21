import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const BoardItemMoveInput = z.object({
  query: z.string().describe("The GraphQL query or mutation"),
  variables: z.record(z.string(), z.unknown()).optional().describe("GraphQL query variables"),
})

export const BoardItemMoveOutput = z.object({
  data: z.record(z.string(), z.unknown()).optional(),
})

export const boardItemMove = pikkuSessionlessFunc({
  description: "Move an item to a group",
  input: BoardItemMoveInput,
  output: BoardItemMoveOutput,
  func: async ({ mondayCom }, data) => {
    return mondayCom.call("POST", "/v2/boardItemMove", data) as any
  },
})
