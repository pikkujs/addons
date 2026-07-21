import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const RoomMemberGetAllInput = z.object({
  roomId: z.string(),
  membership: z.string().optional(),
  not_membership: z.string().optional(),
})

export const RoomMemberGetAllOutput = z.object({
  chunk: z.array(z.record(z.string(), z.unknown())).optional(),
})

export const roomMemberGetAll = pikkuSessionlessFunc({
  description: "Get members of a room",
  input: RoomMemberGetAllInput,
  output: RoomMemberGetAllOutput,
  func: async ({ matrix }, data) => {
    return matrix.call("GET", "/rooms/{roomId}/members", data) as any
  },
})
