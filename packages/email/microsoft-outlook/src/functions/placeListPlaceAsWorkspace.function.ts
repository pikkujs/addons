import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const PlaceListPlaceAsWorkspaceInput = z.object({
  $top: z.number().int().min(0).optional().describe("Show only the first n items. Example: 50"),
  $skip: z.number().int().min(0).optional().describe("Skip the first n items"),
  $search: z.string().optional().describe("Search items by search phrases"),
  $filter: z.string().optional().describe("Filter items by property values"),
  $count: z.boolean().optional().describe("Include count of items"),
  $orderby: z.array(z.string()).optional().describe("Order items by property values"),
  $select: z.array(z.string()).optional().describe("Select properties to be returned"),
  $expand: z.array(z.string()).optional().describe("Expand related entities"),
})

export const PlaceListPlaceAsWorkspaceOutput = z.object({
  value: z.array(z.object({
    capacity: z.number().min(-2147483648).max(2147483647).nullable().optional().describe("The maximum number of individual desks within a workspace."),
    displayDeviceName: z.string().nullable().optional().describe("The name of the display device (for example, monitor or projector) that is available in the workspace."),
    emailAddress: z.string().nullable().optional().describe("The email address that is associated with the workspace. This email address is used for booking."),
    mode: z.record(z.string(), z.record(z.string(), z.unknown())).optional(),
    nickname: z.string().optional().describe("A short, friendly name for the workspace, often used for easier identification or display in the UI."),
    placeId: z.string().nullable().optional().describe("An alternative immutable unique identifier of the workspace. Read-only."),
  })).optional(),
  "@odata.nextLink": z.string().nullable().optional(),
})

export const placeListPlaceAsWorkspace = pikkuSessionlessFunc({
  description: "Get a collection of the specified type of place objects defined in a tenant. You can do the following for a given tenant:\r\n- List all buildings.\r\n- List all floors.\r\n- List all sections.\r\n- List all desks.\r\n- List all rooms.\r\n- List all workspaces.\r\n- List all room lists.\r\n- List rooms in a specific room list.\r\n- List workspaces in a specific room list.",
  input: PlaceListPlaceAsWorkspaceInput,
  output: PlaceListPlaceAsWorkspaceOutput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("GET", "/places/microsoft.graph.workspace", data) as any
  },
})
