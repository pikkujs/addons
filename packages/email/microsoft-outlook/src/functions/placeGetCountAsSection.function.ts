import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const PlaceGetCountAsSectionInput = z.object({
  $search: z.string().optional().describe("Search items by search phrases"),
  $filter: z.string().optional().describe("Filter items by property values"),
})

export const placeGetCountAsSection = pikkuSessionlessFunc({
  input: PlaceGetCountAsSectionInput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("GET", "/places/microsoft.graph.section/$count", data)
  },
})
