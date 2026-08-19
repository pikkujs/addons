import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const BoardMemberAddInput = z.object({
  id: z.string(),
  idMember: z.string(),
  type: z.string().optional(),
})

export const BoardMemberAddOutput = z.record(z.string(), z.unknown())

export const boardMemberAdd = pikkuSessionlessFunc({
  description: "Add a board member",
  input: BoardMemberAddInput,
  output: BoardMemberAddOutput,
  func: async ({ trello }, data) => {
    return trello.call("PUT", "/boards/{id}/members/{idMember}", data) as any
  },
})
