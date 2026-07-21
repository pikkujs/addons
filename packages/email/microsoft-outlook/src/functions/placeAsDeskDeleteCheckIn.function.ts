import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const PlaceAsDeskDeleteCheckInInput = z.object({
  "place-id": z.string().describe("The unique identifier of place"),
  "checkInClaim-calendarEventId": z.string().describe("The unique identifier of checkInClaim"),
  "If-Match": z.string().optional().describe("ETag"),
})

export const placeAsDeskDeleteCheckIn = pikkuSessionlessFunc({
  input: PlaceAsDeskDeleteCheckInInput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("DELETE", "/places/{place-id}/microsoft.graph.desk/checkIns/{checkInClaim-calendarEventId}", data)
  },
})
