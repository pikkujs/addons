import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const PlaceAsBuildingMapListFootprintInput = z.object({
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

export const PlaceAsBuildingMapListFootprintOutput = z.object({
  value: z.array(z.unknown()).optional(),
  "@odata.nextLink": z.string().nullable().optional(),
})

export const placeAsBuildingMapListFootprint = pikkuSessionlessFunc({
  description: "Get a list of footprintMap objects for building footprints and their properties.",
  input: PlaceAsBuildingMapListFootprintInput,
  output: PlaceAsBuildingMapListFootprintOutput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("GET", "/places/{place-id}/microsoft.graph.building/map/footprints", data) as any
  },
})
