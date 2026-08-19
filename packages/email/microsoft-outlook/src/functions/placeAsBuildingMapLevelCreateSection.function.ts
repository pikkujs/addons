import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const PlaceAsBuildingMapLevelCreateSectionInput = z.object({
  "place-id": z.string().describe("The unique identifier of place"),
  "levelMap-id": z.string().describe("The unique identifier of levelMap"),
  body: z.object({
  placeId: z.string().nullable().optional().describe("Identifier of the section to which this sectionMap belongs."),
}),
})

export const PlaceAsBuildingMapLevelCreateSectionOutput = z.object({
  placeId: z.string().nullable().optional().describe("Identifier of the section to which this sectionMap belongs."),
})

export const placeAsBuildingMapLevelCreateSection = pikkuSessionlessFunc({
  input: PlaceAsBuildingMapLevelCreateSectionInput,
  output: PlaceAsBuildingMapLevelCreateSectionOutput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("POST", "/places/{place-id}/microsoft.graph.building/map/levels/{levelMap-id}/sections", data) as any
  },
})
