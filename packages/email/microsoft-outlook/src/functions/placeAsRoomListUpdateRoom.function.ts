import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const PlaceAsRoomListUpdateRoomInput = z.object({
  "place-id": z.string().describe("The unique identifier of place"),
  "room-id": z.string().describe("The unique identifier of room"),
  body: z.object({
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
}),
})

export const PlaceAsRoomListUpdateRoomOutput = z.object({
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

export const placeAsRoomListUpdateRoom = pikkuSessionlessFunc({
  input: PlaceAsRoomListUpdateRoomInput,
  output: PlaceAsRoomListUpdateRoomOutput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("PATCH", "/places/{place-id}/microsoft.graph.roomList/rooms/{room-id}", data) as any
  },
})
