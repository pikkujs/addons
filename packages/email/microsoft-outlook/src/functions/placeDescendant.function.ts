import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const PlaceDescendantInput = z.object({
  "place-id": z.string().describe("The unique identifier of place"),
  $top: z.number().int().min(0).optional().describe("Show only the first n items. Example: 50"),
  $skip: z.number().int().min(0).optional().describe("Skip the first n items"),
  $search: z.string().optional().describe("Search items by search phrases"),
  $filter: z.string().optional().describe("Filter items by property values"),
  $count: z.boolean().optional().describe("Include count of items"),
  $select: z.array(z.string()).optional().describe("Select properties to be returned"),
  $orderby: z.array(z.string()).optional().describe("Order items by property values"),
  $expand: z.array(z.string()).optional().describe("Expand related entities"),
})

export const PlaceDescendantOutput = z.object({
  value: z.array(z.object({
    id: z.string().optional().describe("The unique identifier for an entity. Read-only."),
    address: z.object({
      city: z.string().nullable().optional().describe("The city."),
      countryOrRegion: z.string().nullable().optional().describe("The country or region. It's a free-format string value, for example, 'United States'."),
      postalCode: z.string().nullable().optional().describe("The postal code."),
      state: z.string().nullable().optional().describe("The state."),
      street: z.string().nullable().optional().describe("The street."),
    }).optional(),
    displayName: z.string().optional().describe("The name that is associated with the place."),
    geoCoordinates: z.object({
      accuracy: z.number().nullable().optional().describe("The accuracy of the latitude and longitude. As an example, the accuracy can be measured in meters, such as the latitude and longitude are accurate to within 50 meters."),
      altitude: z.number().nullable().optional().describe("The altitude of the location."),
      altitudeAccuracy: z.number().nullable().optional().describe("The accuracy of the altitude."),
      latitude: z.number().nullable().optional().describe("The latitude of the location."),
      longitude: z.number().nullable().optional().describe("The longitude of the location."),
    }).optional(),
    isWheelChairAccessible: z.boolean().nullable().optional().describe("Indicates whether the place is wheelchair accessible."),
    label: z.string().nullable().optional().describe("User-defined description of the place."),
    parentId: z.string().nullable().optional().describe("The ID of a parent place."),
    phone: z.string().nullable().optional().describe("The phone number of the place."),
    tags: z.array(z.string()).optional().describe("Custom tags that are associated with the place for categorization or filtering."),
    checkIns: z.array(z.object({
      calendarEventId: z.string().optional().describe("The unique identifier for an Outlook calendar event associated with the checkInClaim object. For more information, see the iCalUId property in event."),
      checkInMethod: z.enum(["unspecified", "manual", "inferred", "verified", "unknownFutureValue"]).optional(),
      createdDateTime: z.string().datetime().regex(new RegExp("^[0-9]{4,}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])T([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]([.][0-9]{1,12})?(Z|[+-][0-9][0-9]:[0-9][0-9])$")).nullable().optional().describe("The date and time when the checkInClaim object was created. The timestamp type represents date and time information using ISO 8601 format and is always in UTC. For example, midnight UTC on Jan 1, 2014 is 2014-01-01T00:00:00Z."),
    })).optional().describe("A subresource of a place object that indicates the check-in status of an Outlook calendar event booked at the place."),
  })).optional(),
  "@odata.nextLink": z.string().nullable().optional(),
})

export const placeDescendant = pikkuSessionlessFunc({
  input: PlaceDescendantInput,
  output: PlaceDescendantOutput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("GET", "/places/{place-id}/microsoft.graph.descendants()", data) as any
  },
})
