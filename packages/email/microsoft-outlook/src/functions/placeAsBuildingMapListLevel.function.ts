import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const PlaceAsBuildingMapListLevelInput = z.object({
  "place-id": z.string().describe("The unique identifier of place"),
  $top: z.number().int().min(0).optional().describe("Show only the first n items. Example: 50"),
  $skip: z.number().int().min(0).optional().describe("Skip the first n items"),
  $search: z.string().optional().describe("Search items by search phrases"),
  $filter: z.string().optional().describe("Filter items by property values"),
  $count: z.boolean().optional().describe("Include count of items"),
  $orderby: z.array(z.string()).optional().describe("Order items by property values"),
  $select: z.array(z.string()).optional().describe("Select properties to be returned"),
  $expand: z.array(z.string()).optional().describe("Expand related entities"),
})

export const PlaceAsBuildingMapListLevelOutput = z.object({
  value: z.array(z.object({
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
  })).optional(),
  "@odata.nextLink": z.string().nullable().optional(),
})

export const placeAsBuildingMapListLevel = pikkuSessionlessFunc({
  description: "Get a list of the levelMap objects and their properties.",
  input: PlaceAsBuildingMapListLevelInput,
  output: PlaceAsBuildingMapListLevelOutput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("GET", "/places/{place-id}/microsoft.graph.building/map/levels", data) as any
  },
})
