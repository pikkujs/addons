import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const PlaceGetPlaceAsRoomInput = z.object({
  "place-id": z.string().describe("The unique identifier of place"),
  $select: z.array(z.string()).optional().describe("Select properties to be returned"),
  $expand: z.array(z.string()).optional().describe("Expand related entities"),
})

export const PlaceGetPlaceAsRoomOutput = z.object({
  audioDeviceName: z.string().nullable().optional().describe("Specifies the name of the audio device in the room."),
  bookingType: z.enum(["unknown", "standard", "reserved"]).optional(),
  building: z.string().nullable().optional().describe("Specifies the building name or building number that the room is in."),
  capacity: z.number().min(-2147483648).max(2147483647).nullable().optional().describe("Specifies the capacity of the room."),
  displayDeviceName: z.string().nullable().optional().describe("Specifies the name of the display device in the room."),
  emailAddress: z.string().nullable().optional().describe("Email address of the room."),
  floorLabel: z.string().nullable().optional().describe("Specifies a descriptive label for the floor, for example, P."),
  floorNumber: z.number().min(-2147483648).max(2147483647).nullable().optional().describe("Specifies the floor number that the room is on."),
  nickname: z.string().optional().describe("Specifies a nickname for the room, for example, 'conf room'."),
  placeId: z.string().nullable().optional().describe("An alternative immutable unique identifier of the room. Read-only."),
  teamsEnabledState: z.enum(["unknown", "enabled", "disabled", "unknownFutureValue"]).optional(),
  videoDeviceName: z.string().nullable().optional().describe("Specifies the name of the video device in the room."),
})

export const placeGetPlaceAsRoom = pikkuSessionlessFunc({
  description: "Get a collection of the specified type of place objects defined in a tenant. You can do the following for a given tenant:\r\n- List all buildings.\r\n- List all floors.\r\n- List all sections.\r\n- List all desks.\r\n- List all rooms.\r\n- List all workspaces.\r\n- List all room lists.\r\n- List rooms in a specific room list.\r\n- List workspaces in a specific room list.",
  input: PlaceGetPlaceAsRoomInput,
  output: PlaceGetPlaceAsRoomOutput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("GET", "/places/{place-id}/microsoft.graph.room", data) as any
  },
})
