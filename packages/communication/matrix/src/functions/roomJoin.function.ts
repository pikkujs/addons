import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const RoomJoinInput = z.object({
  roomIdOrAlias: z.string(),
})

export const RoomJoinOutput = z.object({
  room_id: z.string().optional(),
})

export const roomJoin = pikkuSessionlessFunc({
  description: "Join a room",
  input: RoomJoinInput,
  output: RoomJoinOutput,
  func: async ({ matrix }, data) => {
    return matrix.call("POST", "/rooms/{roomIdOrAlias}/join", data) as any
  },
})
