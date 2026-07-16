import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const PlaceAsRoomListListRoomInput = z.object({
  "place-id": z.string().describe("The unique identifier of place"),
  $top: z.number().int().min(0).optional().describe("Show only the first n items. Example: 50"),
  $skip: z.number().int().min(0).optional().describe("Skip the first n items"),
  $search: z.string().optional().describe("Search items by search phrases"),
  $filter: z.string().optional().describe("Filter items by property values"),
  $count: z.boolean().optional().describe("Include count of items"),
  $orderby: z.array(z.string()).optional().describe("Order items by property values"),
  $select: z.array(z.string()).optional().describe("Select properties to be returned"),
  $expand: z.array(z.string()).optional().describe("Expand related entities"),
})

export const PlaceAsRoomListListRoomOutput = z.object({
  value: z.array(z.object({
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
  "@odata.nextLink": z.string().nullable().optional(),
})

export const placeAsRoomListListRoom = pikkuSessionlessFunc({
  input: PlaceAsRoomListListRoomInput,
  output: PlaceAsRoomListListRoomOutput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("GET", "/places/{place-id}/microsoft.graph.roomList/rooms", data) as any
  },
})
