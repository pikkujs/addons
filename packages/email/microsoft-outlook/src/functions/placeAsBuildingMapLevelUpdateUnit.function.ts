import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const PlaceAsBuildingMapLevelUpdateUnitInput = z.object({
  "place-id": z.string().describe("The unique identifier of place"),
  "levelMap-id": z.string().describe("The unique identifier of levelMap"),
  "unitMap-id": z.string().describe("The unique identifier of unitMap"),
  body: z.object({
  placeId: z.string().nullable().optional().describe("Identifier of the place (such as a room) to which this unitMap belongs."),
}),
})

export const PlaceAsBuildingMapLevelUpdateUnitOutput = z.object({
  placeId: z.string().nullable().optional().describe("Identifier of the place (such as a room) to which this unitMap belongs."),
})

export const placeAsBuildingMapLevelUpdateUnit = pikkuSessionlessFunc({
  description: "Update the properties of an existing unitMap object in IMDF format on a specified floor, or create one if it doesn't exist.",
  input: PlaceAsBuildingMapLevelUpdateUnitInput,
  output: PlaceAsBuildingMapLevelUpdateUnitOutput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("PATCH", "/places/{place-id}/microsoft.graph.building/map/levels/{levelMap-id}/units/{unitMap-id}", data) as any
  },
})
