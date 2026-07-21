import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const PlaceAsRoomListRoomUpdateCheckInInput = z.object({
  "place-id": z.string().describe("The unique identifier of place"),
  "room-id": z.string().describe("The unique identifier of room"),
  "checkInClaim-calendarEventId": z.string().describe("The unique identifier of checkInClaim"),
  calendarEventId: z.string().optional().describe("The unique identifier for an Outlook calendar event associated with the checkInClaim object. For more information, see the iCalUId property in event."),
  checkInMethod: z.enum(["unspecified", "manual", "inferred", "verified", "unknownFutureValue"]).optional(),
  createdDateTime: z.string().datetime().regex(new RegExp("^[0-9]{4,}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])T([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]([.][0-9]{1,12})?(Z|[+-][0-9][0-9]:[0-9][0-9])$")).nullable().optional().describe("The date and time when the checkInClaim object was created. The timestamp type represents date and time information using ISO 8601 format and is always in UTC. For example, midnight UTC on Jan 1, 2014 is 2014-01-01T00:00:00Z."),
})

export const PlaceAsRoomListRoomUpdateCheckInOutput = z.object({
  calendarEventId: z.string().optional().describe("The unique identifier for an Outlook calendar event associated with the checkInClaim object. For more information, see the iCalUId property in event."),
  checkInMethod: z.enum(["unspecified", "manual", "inferred", "verified", "unknownFutureValue"]).optional(),
  createdDateTime: z.string().datetime().regex(new RegExp("^[0-9]{4,}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])T([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]([.][0-9]{1,12})?(Z|[+-][0-9][0-9]:[0-9][0-9])$")).nullable().optional().describe("The date and time when the checkInClaim object was created. The timestamp type represents date and time information using ISO 8601 format and is always in UTC. For example, midnight UTC on Jan 1, 2014 is 2014-01-01T00:00:00Z."),
})

export const placeAsRoomListRoomUpdateCheckIn = pikkuSessionlessFunc({
  input: PlaceAsRoomListRoomUpdateCheckInInput,
  output: PlaceAsRoomListRoomUpdateCheckInOutput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("PATCH", "/places/{place-id}/microsoft.graph.roomList/rooms/{room-id}/checkIns/{checkInClaim-calendarEventId}", data) as any
  },
})
