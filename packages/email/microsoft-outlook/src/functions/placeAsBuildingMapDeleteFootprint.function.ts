import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const PlaceAsBuildingMapDeleteFootprintInput = z.object({
  "place-id": z.string().describe("The unique identifier of place"),
  "footprintMap-id": z.string().describe("The unique identifier of footprintMap"),
  "If-Match": z.string().optional().describe("ETag"),
})

export const placeAsBuildingMapDeleteFootprint = pikkuSessionlessFunc({
  input: PlaceAsBuildingMapDeleteFootprintInput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("DELETE", "/places/{place-id}/microsoft.graph.building/map/footprints/{footprintMap-id}", data)
  },
})
