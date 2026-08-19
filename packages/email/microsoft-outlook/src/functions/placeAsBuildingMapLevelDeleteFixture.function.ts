import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const PlaceAsBuildingMapLevelDeleteFixtureInput = z.object({
  "place-id": z.string().describe("The unique identifier of place"),
  "levelMap-id": z.string().describe("The unique identifier of levelMap"),
  "fixtureMap-id": z.string().describe("The unique identifier of fixtureMap"),
  "If-Match": z.string().optional().describe("ETag"),
})

export const placeAsBuildingMapLevelDeleteFixture = pikkuSessionlessFunc({
  description: "Delete a fixture on a specified floor.",
  input: PlaceAsBuildingMapLevelDeleteFixtureInput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("DELETE", "/places/{place-id}/microsoft.graph.building/map/levels/{levelMap-id}/fixtures/{fixtureMap-id}", data)
  },
})
