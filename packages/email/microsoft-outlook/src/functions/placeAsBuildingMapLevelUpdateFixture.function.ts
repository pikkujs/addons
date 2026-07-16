import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const PlaceAsBuildingMapLevelUpdateFixtureInput = z.object({
  "place-id": z.string().describe("The unique identifier of place"),
  "levelMap-id": z.string().describe("The unique identifier of levelMap"),
  "fixtureMap-id": z.string().describe("The unique identifier of fixtureMap"),
  body: z.object({
  placeId: z.string().nullable().optional().describe("Identifier for the floor to which this fixtureMap belongs."),
}),
})

export const PlaceAsBuildingMapLevelUpdateFixtureOutput = z.object({
  placeId: z.string().nullable().optional().describe("Identifier for the floor to which this fixtureMap belongs."),
})

export const placeAsBuildingMapLevelUpdateFixture = pikkuSessionlessFunc({
  description: "Update the properties of an existing fixtureMap object in IMDF format on a specified floor, or create one if it doesn't exist.",
  input: PlaceAsBuildingMapLevelUpdateFixtureInput,
  output: PlaceAsBuildingMapLevelUpdateFixtureOutput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("PATCH", "/places/{place-id}/microsoft.graph.building/map/levels/{levelMap-id}/fixtures/{fixtureMap-id}", data) as any
  },
})
