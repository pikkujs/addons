import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const PlaceAsBuildingMapLevelGetUnitInput = z.object({
  "place-id": z.string().describe("The unique identifier of place"),
  "levelMap-id": z.string().describe("The unique identifier of levelMap"),
  "unitMap-id": z.string().describe("The unique identifier of unitMap"),
  $select: z.array(z.string()).optional().describe("Select properties to be returned"),
  $expand: z.array(z.string()).optional().describe("Expand related entities"),
})

export const PlaceAsBuildingMapLevelGetUnitOutput = z.object({
  placeId: z.string().nullable().optional().describe("Identifier of the place (such as a room) to which this unitMap belongs."),
})

export const placeAsBuildingMapLevelGetUnit = pikkuSessionlessFunc({
  description: "Collection of units (such as rooms or offices) on this level. Supports upsert.",
  input: PlaceAsBuildingMapLevelGetUnitInput,
  output: PlaceAsBuildingMapLevelGetUnitOutput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("GET", "/places/{place-id}/microsoft.graph.building/map/levels/{levelMap-id}/units/{unitMap-id}", data) as any
  },
})
