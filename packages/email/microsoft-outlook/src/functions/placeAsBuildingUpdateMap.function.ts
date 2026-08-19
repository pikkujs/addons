import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const PlaceAsBuildingUpdateMapInput = z.object({
  "place-id": z.string().describe("The unique identifier of place"),
  body: z.object({
  placeId: z.string().nullable().optional().describe("Identifier for the building to which this buildingMap belongs."),
  footprints: z.array(z.unknown()).optional().describe("Represents the approximate physical extent of a referenced building. It corresponds to footprint.geojson in IMDF format."),
  levels: z.array(z.object({
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
  })).optional().describe("Represents a physical floor structure within a building. It corresponds to level.geojson in IMDF format."),
}),
})

export const PlaceAsBuildingUpdateMapOutput = z.object({
  placeId: z.string().nullable().optional().describe("Identifier for the building to which this buildingMap belongs."),
  footprints: z.array(z.unknown()).optional().describe("Represents the approximate physical extent of a referenced building. It corresponds to footprint.geojson in IMDF format."),
  levels: z.array(z.object({
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
  })).optional().describe("Represents a physical floor structure within a building. It corresponds to level.geojson in IMDF format."),
})

export const placeAsBuildingUpdateMap = pikkuSessionlessFunc({
  input: PlaceAsBuildingUpdateMapInput,
  output: PlaceAsBuildingUpdateMapOutput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("PATCH", "/places/{place-id}/microsoft.graph.building/map", data) as any
  },
})
