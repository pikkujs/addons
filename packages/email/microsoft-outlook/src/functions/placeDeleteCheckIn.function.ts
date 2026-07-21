import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const PlaceDeleteCheckInInput = z.object({
  "place-id": z.string().describe("The unique identifier of place"),
  "checkInClaim-calendarEventId": z.string().describe("The unique identifier of checkInClaim"),
  "If-Match": z.string().optional().describe("ETag"),
})

export const placeDeleteCheckIn = pikkuSessionlessFunc({
  input: PlaceDeleteCheckInInput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("DELETE", "/places/{place-id}/checkIns/{checkInClaim-calendarEventId}", data)
  },
})
