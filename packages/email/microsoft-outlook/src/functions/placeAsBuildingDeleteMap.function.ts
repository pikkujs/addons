import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const PlaceAsBuildingDeleteMapInput = z.object({
  "place-id": z.string().describe("The unique identifier of place"),
  "If-Match": z.string().optional().describe("ETag"),
})

export const placeAsBuildingDeleteMap = pikkuSessionlessFunc({
  description: "Delete the map of a specific building.",
  input: PlaceAsBuildingDeleteMapInput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("DELETE", "/places/{place-id}/microsoft.graph.building/map", data)
  },
})
