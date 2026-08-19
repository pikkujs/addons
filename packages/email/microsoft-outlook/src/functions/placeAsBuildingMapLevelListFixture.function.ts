import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const PlaceAsBuildingMapLevelListFixtureInput = z.object({
  "place-id": z.string().describe("The unique identifier of place"),
  "levelMap-id": z.string().describe("The unique identifier of levelMap"),
  $top: z.number().int().min(0).optional().describe("Show only the first n items. Example: 50"),
  $skip: z.number().int().min(0).optional().describe("Skip the first n items"),
  $search: z.string().optional().describe("Search items by search phrases"),
  $filter: z.string().optional().describe("Filter items by property values"),
  $count: z.boolean().optional().describe("Include count of items"),
  $orderby: z.array(z.string()).optional().describe("Order items by property values"),
  $select: z.array(z.string()).optional().describe("Select properties to be returned"),
  $expand: z.array(z.string()).optional().describe("Expand related entities"),
})

export const PlaceAsBuildingMapLevelListFixtureOutput = z.object({
  value: z.array(z.object({
    placeId: z.string().nullable().optional().describe("Identifier for the floor to which this fixtureMap belongs."),
  })).optional(),
  "@odata.nextLink": z.string().nullable().optional(),
})

export const placeAsBuildingMapLevelListFixture = pikkuSessionlessFunc({
  description: "Get a list of the fixtureMap objects and their properties.",
  input: PlaceAsBuildingMapLevelListFixtureInput,
  output: PlaceAsBuildingMapLevelListFixtureOutput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("GET", "/places/{place-id}/microsoft.graph.building/map/levels/{levelMap-id}/fixtures", data) as any
  },
})
