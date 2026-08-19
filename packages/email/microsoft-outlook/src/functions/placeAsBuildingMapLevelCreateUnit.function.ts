import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const PlaceAsBuildingMapLevelCreateUnitInput = z.object({
  "place-id": z.string().describe("The unique identifier of place"),
  "levelMap-id": z.string().describe("The unique identifier of levelMap"),
  body: z.object({
  placeId: z.string().nullable().optional().describe("Identifier of the place (such as a room) to which this unitMap belongs."),
}),
})

export const PlaceAsBuildingMapLevelCreateUnitOutput = z.object({
  placeId: z.string().nullable().optional().describe("Identifier of the place (such as a room) to which this unitMap belongs."),
})

export const placeAsBuildingMapLevelCreateUnit = pikkuSessionlessFunc({
  input: PlaceAsBuildingMapLevelCreateUnitInput,
  output: PlaceAsBuildingMapLevelCreateUnitOutput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("POST", "/places/{place-id}/microsoft.graph.building/map/levels/{levelMap-id}/units", data) as any
  },
})
