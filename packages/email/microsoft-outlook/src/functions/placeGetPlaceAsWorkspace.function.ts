import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const PlaceGetPlaceAsWorkspaceInput = z.object({
  "place-id": z.string().describe("The unique identifier of place"),
  $select: z.array(z.string()).optional().describe("Select properties to be returned"),
  $expand: z.array(z.string()).optional().describe("Expand related entities"),
})

export const PlaceGetPlaceAsWorkspaceOutput = z.object({
  capacity: z.number().min(-2147483648).max(2147483647).nullable().optional().describe("The maximum number of individual desks within a workspace."),
  displayDeviceName: z.string().nullable().optional().describe("The name of the display device (for example, monitor or projector) that is available in the workspace."),
  emailAddress: z.string().nullable().optional().describe("The email address that is associated with the workspace. This email address is used for booking."),
  mode: z.record(z.string(), z.record(z.string(), z.unknown())).optional(),
  nickname: z.string().optional().describe("A short, friendly name for the workspace, often used for easier identification or display in the UI."),
  placeId: z.string().nullable().optional().describe("An alternative immutable unique identifier of the workspace. Read-only."),
})

export const placeGetPlaceAsWorkspace = pikkuSessionlessFunc({
  description: "Get a collection of the specified type of place objects defined in a tenant. You can do the following for a given tenant:\r\n- List all buildings.\r\n- List all floors.\r\n- List all sections.\r\n- List all desks.\r\n- List all rooms.\r\n- List all workspaces.\r\n- List all room lists.\r\n- List rooms in a specific room list.\r\n- List workspaces in a specific room list.",
  input: PlaceGetPlaceAsWorkspaceInput,
  output: PlaceGetPlaceAsWorkspaceOutput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("GET", "/places/{place-id}/microsoft.graph.workspace", data) as any
  },
})
