import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const PlaceAsBuildingMapLevelCreateFixtureInput = z.object({
  "place-id": z.string().describe("The unique identifier of place"),
  "levelMap-id": z.string().describe("The unique identifier of levelMap"),
  body: z.object({
  placeId: z.string().nullable().optional().describe("Identifier for the floor to which this fixtureMap belongs."),
}),
})

export const PlaceAsBuildingMapLevelCreateFixtureOutput = z.object({
  placeId: z.string().nullable().optional().describe("Identifier for the floor to which this fixtureMap belongs."),
})

export const placeAsBuildingMapLevelCreateFixture = pikkuSessionlessFunc({
  input: PlaceAsBuildingMapLevelCreateFixtureInput,
  output: PlaceAsBuildingMapLevelCreateFixtureOutput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("POST", "/places/{place-id}/microsoft.graph.building/map/levels/{levelMap-id}/fixtures", data) as any
  },
})
