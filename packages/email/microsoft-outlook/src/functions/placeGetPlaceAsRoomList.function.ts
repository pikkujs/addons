import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const PlaceGetPlaceAsRoomListInput = z.object({
  "place-id": z.string().describe("The unique identifier of place"),
  $select: z.array(z.string()).optional().describe("Select properties to be returned"),
  $expand: z.array(z.string()).optional().describe("Expand related entities"),
})

export const PlaceGetPlaceAsRoomListOutput = z.object({
  emailAddress: z.string().nullable().optional().describe("The email address of the room list."),
  rooms: z.array(z.object({
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
  })).optional(),
  workspaces: z.array(z.object({
    capacity: z.number().min(-2147483648).max(2147483647).nullable().optional().describe("The maximum number of individual desks within a workspace."),
    displayDeviceName: z.string().nullable().optional().describe("The name of the display device (for example, monitor or projector) that is available in the workspace."),
    emailAddress: z.string().nullable().optional().describe("The email address that is associated with the workspace. This email address is used for booking."),
    mode: z.record(z.string(), z.record(z.string(), z.unknown())).optional(),
    nickname: z.string().optional().describe("A short, friendly name for the workspace, often used for easier identification or display in the UI."),
    placeId: z.string().nullable().optional().describe("An alternative immutable unique identifier of the workspace. Read-only."),
  })).optional(),
})

export const placeGetPlaceAsRoomList = pikkuSessionlessFunc({
  description: "Read the properties of a place object specified by its ID. The place object can be one of the following types: The listed resources are derived from the place object.",
  input: PlaceGetPlaceAsRoomListInput,
  output: PlaceGetPlaceAsRoomListOutput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("GET", "/places/{place-id}/microsoft.graph.roomList", data) as any
  },
})
