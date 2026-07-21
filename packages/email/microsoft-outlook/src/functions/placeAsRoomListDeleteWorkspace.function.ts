import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const PlaceAsRoomListDeleteWorkspaceInput = z.object({
  "place-id": z.string().describe("The unique identifier of place"),
  "workspace-id": z.string().describe("The unique identifier of workspace"),
  "If-Match": z.string().optional().describe("ETag"),
})

export const placeAsRoomListDeleteWorkspace = pikkuSessionlessFunc({
  input: PlaceAsRoomListDeleteWorkspaceInput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("DELETE", "/places/{place-id}/microsoft.graph.roomList/workspaces/{workspace-id}", data)
  },
})
