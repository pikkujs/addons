import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const BoardArchiveInput = z.object({
  query: z.string().describe("The GraphQL query or mutation"),
  variables: z.record(z.string(), z.unknown()).optional().describe("GraphQL query variables"),
})

export const BoardArchiveOutput = z.object({
  data: z.record(z.string(), z.unknown()).optional(),
})

export const boardArchive = pikkuSessionlessFunc({
  description: "Archive a board",
  input: BoardArchiveInput,
  output: BoardArchiveOutput,
  func: async ({ mondayCom }, data) => {
    return mondayCom.call("POST", "/v2/boardArchive", data) as any
  },
})
