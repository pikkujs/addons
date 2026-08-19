import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const PlaceGetPlaceAsFloorInput = z.object({
  "place-id": z.string().describe("The unique identifier of place"),
  $select: z.array(z.string()).optional().describe("Select properties to be returned"),
  $expand: z.array(z.string()).optional().describe("Expand related entities"),
})

export const PlaceGetPlaceAsFloorOutput = z.object({
  sortOrder: z.number().min(-2147483648).max(2147483647).nullable().optional().describe("Specifies the sort order of the floor. For example, a floor might be named 'Lobby' with a sort order of 0 to show this floor first in ordered lists."),
})

export const placeGetPlaceAsFloor = pikkuSessionlessFunc({
  description: "Get a collection of the specified type of place objects defined in a tenant. You can do the following for a given tenant:\r\n- List all buildings.\r\n- List all floors.\r\n- List all sections.\r\n- List all desks.\r\n- List all rooms.\r\n- List all workspaces.\r\n- List all room lists.\r\n- List rooms in a specific room list.\r\n- List workspaces in a specific room list.",
  input: PlaceGetPlaceAsFloorInput,
  output: PlaceGetPlaceAsFloorOutput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("GET", "/places/{place-id}/microsoft.graph.floor", data) as any
  },
})
