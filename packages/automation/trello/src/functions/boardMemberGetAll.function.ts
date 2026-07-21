import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const BoardMemberGetAllInput = z.object({
  id: z.string(),
})

export const BoardMemberGetAllOutput = z.record(z.string(), z.unknown())

export const boardMemberGetAll = pikkuSessionlessFunc({
  description: "Get many board members",
  input: BoardMemberGetAllInput,
  output: BoardMemberGetAllOutput,
  func: async ({ trello }, data) => {
    return trello.call("GET", "/boards/{id}/members", data) as any
  },
})
