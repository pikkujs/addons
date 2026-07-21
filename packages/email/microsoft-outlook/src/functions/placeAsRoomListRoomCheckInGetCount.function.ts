import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const PlaceAsRoomListRoomCheckInGetCountInput = z.object({
  "place-id": z.string().describe("The unique identifier of place"),
  "room-id": z.string().describe("The unique identifier of room"),
  $search: z.string().optional().describe("Search items by search phrases"),
  $filter: z.string().optional().describe("Filter items by property values"),
})

export const placeAsRoomListRoomCheckInGetCount = pikkuSessionlessFunc({
  input: PlaceAsRoomListRoomCheckInGetCountInput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("GET", "/places/{place-id}/microsoft.graph.roomList/rooms/{room-id}/checkIns/$count", data)
  },
})
