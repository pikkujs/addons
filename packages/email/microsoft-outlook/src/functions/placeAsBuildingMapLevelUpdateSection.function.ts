import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const PlaceAsBuildingMapLevelUpdateSectionInput = z.object({
  "place-id": z.string().describe("The unique identifier of place"),
  "levelMap-id": z.string().describe("The unique identifier of levelMap"),
  "sectionMap-id": z.string().describe("The unique identifier of sectionMap"),
  body: z.object({
  placeId: z.string().nullable().optional().describe("Identifier of the section to which this sectionMap belongs."),
}),
})

export const PlaceAsBuildingMapLevelUpdateSectionOutput = z.object({
  placeId: z.string().nullable().optional().describe("Identifier of the section to which this sectionMap belongs."),
})

export const placeAsBuildingMapLevelUpdateSection = pikkuSessionlessFunc({
  input: PlaceAsBuildingMapLevelUpdateSectionInput,
  output: PlaceAsBuildingMapLevelUpdateSectionOutput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("PATCH", "/places/{place-id}/microsoft.graph.building/map/levels/{levelMap-id}/sections/{sectionMap-id}", data) as any
  },
})
