import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const RoomCreateInput = z.object({
  name: z.string().optional(),
  preset: z.string().optional(),
  room_alias_name: z.string().optional(),
})

export const RoomCreateOutput = z.object({
  room_id: z.string().optional(),
})

export const roomCreate = pikkuSessionlessFunc({
  description: "Create a room",
  input: RoomCreateInput,
  output: RoomCreateOutput,
  func: async ({ matrix }, data) => {
    return matrix.call("POST", "/createRoom", data) as any
  },
})
