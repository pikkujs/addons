import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const PlaceAsSectionDeleteCheckInInput = z.object({
  "place-id": z.string().describe("The unique identifier of place"),
  "checkInClaim-calendarEventId": z.string().describe("The unique identifier of checkInClaim"),
  "If-Match": z.string().optional().describe("ETag"),
})

export const placeAsSectionDeleteCheckIn = pikkuSessionlessFunc({
  input: PlaceAsSectionDeleteCheckInInput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("DELETE", "/places/{place-id}/microsoft.graph.section/checkIns/{checkInClaim-calendarEventId}", data)
  },
})
