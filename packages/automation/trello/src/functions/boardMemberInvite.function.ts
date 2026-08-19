import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const BoardMemberInviteInput = z.object({
  id: z.string(),
  email: z.string().optional(),
  type: z.string().optional(),
  fullName: z.string().optional(),
})

export const BoardMemberInviteOutput = z.record(z.string(), z.unknown())

export const boardMemberInvite = pikkuSessionlessFunc({
  description: "Invite a board member",
  input: BoardMemberInviteInput,
  output: BoardMemberInviteOutput,
  func: async ({ trello }, data) => {
    return trello.call("PUT", "/boards/{id}/members", data) as any
  },
})
