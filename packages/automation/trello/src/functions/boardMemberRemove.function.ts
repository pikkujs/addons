import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const BoardMemberRemoveInput = z.object({
  id: z.string(),
  idMember: z.string(),
})

export const BoardMemberRemoveOutput = z.record(z.string(), z.unknown())

export const boardMemberRemove = pikkuSessionlessFunc({
  description: "Remove a board member",
  input: BoardMemberRemoveInput,
  output: BoardMemberRemoveOutput,
  func: async ({ trello }, data) => {
    return trello.call("DELETE", "/boards/{id}/members/{idMember}", data) as any
  },
})
