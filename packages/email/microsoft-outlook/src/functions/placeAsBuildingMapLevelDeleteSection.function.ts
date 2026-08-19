import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const PlaceAsBuildingMapLevelDeleteSectionInput = z.object({
  "place-id": z.string().describe("The unique identifier of place"),
  "levelMap-id": z.string().describe("The unique identifier of levelMap"),
  "sectionMap-id": z.string().describe("The unique identifier of sectionMap"),
  "If-Match": z.string().optional().describe("ETag"),
})

export const placeAsBuildingMapLevelDeleteSection = pikkuSessionlessFunc({
  input: PlaceAsBuildingMapLevelDeleteSectionInput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("DELETE", "/places/{place-id}/microsoft.graph.building/map/levels/{levelMap-id}/sections/{sectionMap-id}", data)
  },
})
