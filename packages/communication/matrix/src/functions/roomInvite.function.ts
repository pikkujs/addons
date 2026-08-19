import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const RoomInviteInput = z.object({
  roomId: z.string(),
  user_id: z.string().optional(),
})

export const RoomInviteOutput = z.record(z.string(), z.unknown())

export const roomInvite = pikkuSessionlessFunc({
  description: "Invite a user to a room",
  input: RoomInviteInput,
  output: RoomInviteOutput,
  func: async ({ matrix }, data) => {
    return matrix.call("POST", "/rooms/{roomId}/invite", data) as any
  },
})
