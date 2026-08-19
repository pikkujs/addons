import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const PlaceListPlaceAsFloorInput = z.object({
  $top: z.number().int().min(0).optional().describe("Show only the first n items. Example: 50"),
  $skip: z.number().int().min(0).optional().describe("Skip the first n items"),
  $search: z.string().optional().describe("Search items by search phrases"),
  $filter: z.string().optional().describe("Filter items by property values"),
  $count: z.boolean().optional().describe("Include count of items"),
  $orderby: z.array(z.string()).optional().describe("Order items by property values"),
  $select: z.array(z.string()).optional().describe("Select properties to be returned"),
  $expand: z.array(z.string()).optional().describe("Expand related entities"),
})

export const PlaceListPlaceAsFloorOutput = z.object({
  value: z.array(z.object({
    sortOrder: z.number().min(-2147483648).max(2147483647).nullable().optional().describe("Specifies the sort order of the floor. For example, a floor might be named 'Lobby' with a sort order of 0 to show this floor first in ordered lists."),
  })).optional(),
  "@odata.nextLink": z.string().nullable().optional(),
})

export const placeListPlaceAsFloor = pikkuSessionlessFunc({
  description: "Get a collection of the specified type of place objects defined in a tenant. You can do the following for a given tenant:\r\n- List all buildings.\r\n- List all floors.\r\n- List all sections.\r\n- List all desks.\r\n- List all rooms.\r\n- List all workspaces.\r\n- List all room lists.\r\n- List rooms in a specific room list.\r\n- List workspaces in a specific room list.",
  input: PlaceListPlaceAsFloorInput,
  output: PlaceListPlaceAsFloorOutput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("GET", "/places/microsoft.graph.floor", data) as any
  },
})
