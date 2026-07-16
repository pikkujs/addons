import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const PlaceAsRoomListWorkspaceDeleteCheckInInput = z.object({
  "place-id": z.string().describe("The unique identifier of place"),
  "workspace-id": z.string().describe("The unique identifier of workspace"),
  "checkInClaim-calendarEventId": z.string().describe("The unique identifier of checkInClaim"),
  "If-Match": z.string().optional().describe("ETag"),
})

export const placeAsRoomListWorkspaceDeleteCheckIn = pikkuSessionlessFunc({
  input: PlaceAsRoomListWorkspaceDeleteCheckInInput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("DELETE", "/places/{place-id}/microsoft.graph.roomList/workspaces/{workspace-id}/checkIns/{checkInClaim-calendarEventId}", data)
  },
})
