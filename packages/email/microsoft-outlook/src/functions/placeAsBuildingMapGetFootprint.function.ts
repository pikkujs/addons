import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const PlaceAsBuildingMapGetFootprintInput = z.object({
  "place-id": z.string().describe("The unique identifier of place"),
  "footprintMap-id": z.string().describe("The unique identifier of footprintMap"),
  $select: z.array(z.string()).optional().describe("Select properties to be returned"),
  $expand: z.array(z.string()).optional().describe("Expand related entities"),
})

export const PlaceAsBuildingMapGetFootprintOutput = z.unknown()

export const placeAsBuildingMapGetFootprint = pikkuSessionlessFunc({
  description: "Represents the approximate physical extent of a referenced building. It corresponds to footprint.geojson in IMDF format.",
  input: PlaceAsBuildingMapGetFootprintInput,
  output: PlaceAsBuildingMapGetFootprintOutput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("GET", "/places/{place-id}/microsoft.graph.building/map/footprints/{footprintMap-id}", data) as any
  },
})
