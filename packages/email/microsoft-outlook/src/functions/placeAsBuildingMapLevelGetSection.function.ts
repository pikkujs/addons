import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const PlaceAsBuildingMapLevelGetSectionInput = z.object({
  "place-id": z.string().describe("The unique identifier of place"),
  "levelMap-id": z.string().describe("The unique identifier of levelMap"),
  "sectionMap-id": z.string().describe("The unique identifier of sectionMap"),
  $select: z.array(z.string()).optional().describe("Select properties to be returned"),
  $expand: z.array(z.string()).optional().describe("Expand related entities"),
})

export const PlaceAsBuildingMapLevelGetSectionOutput = z.object({
  placeId: z.string().nullable().optional().describe("Identifier of the section to which this sectionMap belongs."),
})

export const placeAsBuildingMapLevelGetSection = pikkuSessionlessFunc({
  description: "Collection of sections (such as zones or partitions) on this level. Supports upsert.",
  input: PlaceAsBuildingMapLevelGetSectionInput,
  output: PlaceAsBuildingMapLevelGetSectionOutput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("GET", "/places/{place-id}/microsoft.graph.building/map/levels/{levelMap-id}/sections/{sectionMap-id}", data) as any
  },
})
