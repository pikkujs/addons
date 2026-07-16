import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const PlaceAsRoomListWorkspaceCheckInGetCountInput = z.object({
  "place-id": z.string().describe("The unique identifier of place"),
  "workspace-id": z.string().describe("The unique identifier of workspace"),
  $search: z.string().optional().describe("Search items by search phrases"),
  $filter: z.string().optional().describe("Filter items by property values"),
})

export const placeAsRoomListWorkspaceCheckInGetCount = pikkuSessionlessFunc({
  input: PlaceAsRoomListWorkspaceCheckInGetCountInput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("GET", "/places/{place-id}/microsoft.graph.roomList/workspaces/{workspace-id}/checkIns/$count", data)
  },
})
