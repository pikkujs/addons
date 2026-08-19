import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const RoomKickInput = z.object({
  roomId: z.string(),
  user_id: z.string().optional(),
  reason: z.string().optional(),
})

export const RoomKickOutput = z.record(z.string(), z.unknown())

export const roomKick = pikkuSessionlessFunc({
  description: "Kick a user from a room",
  input: RoomKickInput,
  output: RoomKickOutput,
  func: async ({ matrix }, data) => {
    return matrix.call("POST", "/rooms/{roomId}/kick", data) as any
  },
})
