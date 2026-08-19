import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const PlaceAsBuildingMapLevelDeleteUnitInput = z.object({
  "place-id": z.string().describe("The unique identifier of place"),
  "levelMap-id": z.string().describe("The unique identifier of levelMap"),
  "unitMap-id": z.string().describe("The unique identifier of unitMap"),
  "If-Match": z.string().optional().describe("ETag"),
})

export const placeAsBuildingMapLevelDeleteUnit = pikkuSessionlessFunc({
  description: "Delete a unitMap object.",
  input: PlaceAsBuildingMapLevelDeleteUnitInput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("DELETE", "/places/{place-id}/microsoft.graph.building/map/levels/{levelMap-id}/units/{unitMap-id}", data)
  },
})
