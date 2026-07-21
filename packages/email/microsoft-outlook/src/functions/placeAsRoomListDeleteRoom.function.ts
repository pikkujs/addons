import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const PlaceAsRoomListDeleteRoomInput = z.object({
  "place-id": z.string().describe("The unique identifier of place"),
  "room-id": z.string().describe("The unique identifier of room"),
  "If-Match": z.string().optional().describe("ETag"),
})

export const placeAsRoomListDeleteRoom = pikkuSessionlessFunc({
  input: PlaceAsRoomListDeleteRoomInput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("DELETE", "/places/{place-id}/microsoft.graph.roomList/rooms/{room-id}", data)
  },
})
