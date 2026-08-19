import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const PlaceAsBuildingMapGetLevelInput = z.object({
  "place-id": z.string().describe("The unique identifier of place"),
  "levelMap-id": z.string().describe("The unique identifier of levelMap"),
  $select: z.array(z.string()).optional().describe("Select properties to be returned"),
  $expand: z.array(z.string()).optional().describe("Expand related entities"),
})

export const PlaceAsBuildingMapGetLevelOutput = z.object({
  placeId: z.string().nullable().optional().describe("Identifier of the floor to which this levelMap belongs."),
  fixtures: z.array(z.object({
    placeId: z.string().nullable().optional().describe("Identifier for the floor to which this fixtureMap belongs."),
  })).optional().describe("Collection of fixtures (such as furniture or equipment) on this level. Supports upsert."),
  sections: z.array(z.object({
    placeId: z.string().nullable().optional().describe("Identifier of the section to which this sectionMap belongs."),
  })).optional().describe("Collection of sections (such as zones or partitions) on this level. Supports upsert."),
  units: z.array(z.object({
    placeId: z.string().nullable().optional().describe("Identifier of the place (such as a room) to which this unitMap belongs."),
  })).optional().describe("Collection of units (such as rooms or offices) on this level. Supports upsert."),
})

export const placeAsBuildingMapGetLevel = pikkuSessionlessFunc({
  description: "Represents a physical floor structure within a building. It corresponds to level.geojson in IMDF format.",
  input: PlaceAsBuildingMapGetLevelInput,
  output: PlaceAsBuildingMapGetLevelOutput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("GET", "/places/{place-id}/microsoft.graph.building/map/levels/{levelMap-id}", data) as any
  },
})
