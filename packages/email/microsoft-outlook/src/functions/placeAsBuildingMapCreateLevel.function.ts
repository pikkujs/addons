import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const PlaceAsBuildingMapCreateLevelInput = z.object({
  "place-id": z.string().describe("The unique identifier of place"),
  body: z.object({
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
}),
})

export const PlaceAsBuildingMapCreateLevelOutput = z.object({
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

export const placeAsBuildingMapCreateLevel = pikkuSessionlessFunc({
  input: PlaceAsBuildingMapCreateLevelInput,
  output: PlaceAsBuildingMapCreateLevelOutput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("POST", "/places/{place-id}/microsoft.graph.building/map/levels", data) as any
  },
})
