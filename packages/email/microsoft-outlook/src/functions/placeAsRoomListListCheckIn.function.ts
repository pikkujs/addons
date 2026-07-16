import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const PlaceAsRoomListListCheckInInput = z.object({
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

export const PlaceAsRoomListListCheckInOutput = z.object({
  value: z.array(z.object({
    calendarEventId: z.string().optional().describe("The unique identifier for an Outlook calendar event associated with the checkInClaim object. For more information, see the iCalUId property in event."),
    checkInMethod: z.enum(["unspecified", "manual", "inferred", "verified", "unknownFutureValue"]).optional(),
    createdDateTime: z.string().datetime().regex(new RegExp("^[0-9]{4,}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])T([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]([.][0-9]{1,12})?(Z|[+-][0-9][0-9]:[0-9][0-9])$")).nullable().optional().describe("The date and time when the checkInClaim object was created. The timestamp type represents date and time information using ISO 8601 format and is always in UTC. For example, midnight UTC on Jan 1, 2014 is 2014-01-01T00:00:00Z."),
  })).optional(),
  "@odata.nextLink": z.string().nullable().optional(),
})

export const placeAsRoomListListCheckIn = pikkuSessionlessFunc({
  description: "A subresource of a place object that indicates the check-in status of an Outlook calendar event booked at the place.",
  input: PlaceAsRoomListListCheckInInput,
  output: PlaceAsRoomListListCheckInOutput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("GET", "/places/{place-id}/microsoft.graph.roomList/checkIns", data) as any
  },
})
