import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const PlaceAsRoomListGetWorkspaceInput = z.object({
  "place-id": z.string().describe("The unique identifier of place"),
  "workspace-id": z.string().describe("The unique identifier of workspace"),
  $select: z.array(z.string()).optional().describe("Select properties to be returned"),
  $expand: z.array(z.string()).optional().describe("Expand related entities"),
})

export const PlaceAsRoomListGetWorkspaceOutput = z.object({
  capacity: z.number().min(-2147483648).max(2147483647).nullable().optional().describe("The maximum number of individual desks within a workspace."),
  displayDeviceName: z.string().nullable().optional().describe("The name of the display device (for example, monitor or projector) that is available in the workspace."),
  emailAddress: z.string().nullable().optional().describe("The email address that is associated with the workspace. This email address is used for booking."),
  mode: z.record(z.string(), z.record(z.string(), z.unknown())).optional(),
  nickname: z.string().optional().describe("A short, friendly name for the workspace, often used for easier identification or display in the UI."),
  placeId: z.string().nullable().optional().describe("An alternative immutable unique identifier of the workspace. Read-only."),
})

export const placeAsRoomListGetWorkspace = pikkuSessionlessFunc({
  input: PlaceAsRoomListGetWorkspaceInput,
  output: PlaceAsRoomListGetWorkspaceOutput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("GET", "/places/{place-id}/microsoft.graph.roomList/workspaces/{workspace-id}", data) as any
  },
})
