import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const PlaceAsFloorCheckInGetCountInput = z.object({
  "place-id": z.string().describe("The unique identifier of place"),
  $search: z.string().optional().describe("Search items by search phrases"),
  $filter: z.string().optional().describe("Filter items by property values"),
})

export const placeAsFloorCheckInGetCount = pikkuSessionlessFunc({
  input: PlaceAsFloorCheckInGetCountInput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("GET", "/places/{place-id}/microsoft.graph.floor/checkIns/$count", data)
  },
})
