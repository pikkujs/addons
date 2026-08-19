import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const PlaceGetCountAsRoomInput = z.object({
  $search: z.string().optional().describe("Search items by search phrases"),
  $filter: z.string().optional().describe("Filter items by property values"),
})

export const placeGetCountAsRoom = pikkuSessionlessFunc({
  input: PlaceGetCountAsRoomInput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("GET", "/places/microsoft.graph.room/$count", data)
  },
})
