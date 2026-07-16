import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const PlaceAsBuildingMapLevelGetFixtureInput = z.object({
  "place-id": z.string().describe("The unique identifier of place"),
  "levelMap-id": z.string().describe("The unique identifier of levelMap"),
  "fixtureMap-id": z.string().describe("The unique identifier of fixtureMap"),
  $select: z.array(z.string()).optional().describe("Select properties to be returned"),
  $expand: z.array(z.string()).optional().describe("Expand related entities"),
})

export const PlaceAsBuildingMapLevelGetFixtureOutput = z.object({
  placeId: z.string().nullable().optional().describe("Identifier for the floor to which this fixtureMap belongs."),
})

export const placeAsBuildingMapLevelGetFixture = pikkuSessionlessFunc({
  description: "Collection of fixtures (such as furniture or equipment) on this level. Supports upsert.",
  input: PlaceAsBuildingMapLevelGetFixtureInput,
  output: PlaceAsBuildingMapLevelGetFixtureOutput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("GET", "/places/{place-id}/microsoft.graph.building/map/levels/{levelMap-id}/fixtures/{fixtureMap-id}", data) as any
  },
})
