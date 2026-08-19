import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const PlaceAsRoomListDeleteCheckInInput = z.object({
  "place-id": z.string().describe("The unique identifier of place"),
  "checkInClaim-calendarEventId": z.string().describe("The unique identifier of checkInClaim"),
  "If-Match": z.string().optional().describe("ETag"),
})

export const placeAsRoomListDeleteCheckIn = pikkuSessionlessFunc({
  input: PlaceAsRoomListDeleteCheckInInput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("DELETE", "/places/{place-id}/microsoft.graph.roomList/checkIns/{checkInClaim-calendarEventId}", data)
  },
})
