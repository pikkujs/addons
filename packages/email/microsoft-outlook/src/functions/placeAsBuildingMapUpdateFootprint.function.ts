import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const PlaceAsBuildingMapUpdateFootprintInput = z.object({
  "place-id": z.string().describe("The unique identifier of place"),
  "footprintMap-id": z.string().describe("The unique identifier of footprintMap"),
  body: z.unknown(),
})

export const PlaceAsBuildingMapUpdateFootprintOutput = z.unknown()

export const placeAsBuildingMapUpdateFootprint = pikkuSessionlessFunc({
  input: PlaceAsBuildingMapUpdateFootprintInput,
  output: PlaceAsBuildingMapUpdateFootprintOutput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("PATCH", "/places/{place-id}/microsoft.graph.building/map/footprints/{footprintMap-id}", data) as any
  },
})
