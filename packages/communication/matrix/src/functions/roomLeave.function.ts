import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const RoomLeaveInput = z.object({
  roomId: z.string(),
})

export const RoomLeaveOutput = z.record(z.string(), z.unknown())

export const roomLeave = pikkuSessionlessFunc({
  description: "Leave a room",
  input: RoomLeaveInput,
  output: RoomLeaveOutput,
  func: async ({ matrix }, data) => {
    return matrix.call("POST", "/rooms/{roomId}/leave", data) as any
  },
})
