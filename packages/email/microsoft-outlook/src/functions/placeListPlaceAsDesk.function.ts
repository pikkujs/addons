import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const PlaceListPlaceAsDeskInput = z.object({
  $top: z.number().int().min(0).optional().describe("Show only the first n items. Example: 50"),
  $skip: z.number().int().min(0).optional().describe("Skip the first n items"),
  $search: z.string().optional().describe("Search items by search phrases"),
  $filter: z.string().optional().describe("Filter items by property values"),
  $count: z.boolean().optional().describe("Include count of items"),
  $orderby: z.array(z.string()).optional().describe("Order items by property values"),
  $select: z.array(z.string()).optional().describe("Select properties to be returned"),
  $expand: z.array(z.string()).optional().describe("Expand related entities"),
})

export const PlaceListPlaceAsDeskOutput = z.object({
  value: z.array(z.object({
    displayDeviceName: z.string().nullable().optional().describe("The name of the display device (for example, monitor or projector) that is available at the desk."),
    heightAdjustableState: z.enum(["unknown", "enabled", "disabled", "unknownFutureValue"]).optional(),
    mailboxDetails: z.object({
      emailAddress: z.string().nullable().optional().describe("The primary SMTP address associated with the mailbox."),
      externalDirectoryObjectId: z.string().nullable().optional().describe("The unique identifier of the mailbox in the external directory (such as Microsoft Entra)."),
    }).optional(),
    mode: z.record(z.string(), z.record(z.string(), z.unknown())).optional(),
  })).optional(),
  "@odata.nextLink": z.string().nullable().optional(),
})

export const placeListPlaceAsDesk = pikkuSessionlessFunc({
  description: "Get a collection of the specified type of place objects defined in a tenant. You can do the following for a given tenant:\r\n- List all buildings.\r\n- List all floors.\r\n- List all sections.\r\n- List all desks.\r\n- List all rooms.\r\n- List all workspaces.\r\n- List all room lists.\r\n- List rooms in a specific room list.\r\n- List workspaces in a specific room list.",
  input: PlaceListPlaceAsDeskInput,
  output: PlaceListPlaceAsDeskOutput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("GET", "/places/microsoft.graph.desk", data) as any
  },
})
