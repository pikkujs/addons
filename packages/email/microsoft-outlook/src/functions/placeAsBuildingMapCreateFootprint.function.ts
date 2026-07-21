import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const PlaceAsBuildingMapCreateFootprintInput = z.object({
  "place-id": z.string().describe("The unique identifier of place"),
  body: z.unknown(),
})

export const PlaceAsBuildingMapCreateFootprintOutput = z.unknown()

export const placeAsBuildingMapCreateFootprint = pikkuSessionlessFunc({
  input: PlaceAsBuildingMapCreateFootprintInput,
  output: PlaceAsBuildingMapCreateFootprintOutput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("POST", "/places/{place-id}/microsoft.graph.building/map/footprints", data) as any
  },
})
