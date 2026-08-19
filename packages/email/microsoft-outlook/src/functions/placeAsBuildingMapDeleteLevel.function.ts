import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const PlaceAsBuildingMapDeleteLevelInput = z.object({
  "place-id": z.string().describe("The unique identifier of place"),
  "levelMap-id": z.string().describe("The unique identifier of levelMap"),
  "If-Match": z.string().optional().describe("ETag"),
})

export const placeAsBuildingMapDeleteLevel = pikkuSessionlessFunc({
  input: PlaceAsBuildingMapDeleteLevelInput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("DELETE", "/places/{place-id}/microsoft.graph.building/map/levels/{levelMap-id}", data)
  },
})
