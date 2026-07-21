import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const EventsWatchInput = z.object({
  calendarId: z.string().describe("Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the \"primary\" keyword."),
  alt: z.literal("json").optional().describe("Data format for the response."),
  fields: z.string().optional().describe("Selector specifying which fields to include in a partial response."),
  key: z.string().optional().describe("API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token."),
  oauth_token: z.string().optional().describe("OAuth 2.0 token for the current user."),
  prettyPrint: z.boolean().optional().describe("Returns response with indentations and line breaks."),
  quotaUser: z.string().optional().describe("An opaque string that represents a user for quota purposes. Must not exceed 40 characters."),
  userIp: z.string().optional().describe("Deprecated. Please use quotaUser instead."),
  alwaysIncludeEmail: z.boolean().optional().describe("Deprecated and ignored. A value will always be returned in the email field for the organizer, creator and attendees, even if no real email address is available (i.e. a generated, non-working value will be provided)."),
  eventTypes: z.array(z.string()).optional().describe("Event types to return. Optional. Possible values are: \n- \"default\" \n- \"focusTime\" \n- \"outOfOffice\"This parameter can be repeated multiple times to return events of different types. Currently, this is the only allowed value for this field: \n- [\"default\", \"focusTime\", \"outOfOffice\"] This value will be the default.\n\nIf you're enrolled in the Working Location developer preview program, in addition to the default value above you can also set the \"workingLocation\" event type: \n- [\"default\", \"focusTime\", \"outOfOffice\", \"workingLocation\"] \n- [\"workingLocation\"] Additional combinations of these 4 event types will be made available in later releases. Developer Preview."),
  iCalUID: z.string().optional().describe("Specifies an event ID in the iCalendar format to be provided in the response. Optional. Use this if you want to search for an event by its iCalendar ID."),
  maxAttendees: z.number().int().min(1).optional().describe("The maximum number of attendees to include in the response. If there are more than the specified number of attendees, only the participant is returned. Optional."),
  maxResults: z.number().int().min(1).optional().describe("Maximum number of events returned on one result page. The number of events in the resulting page may be less than this value, or none at all, even if there are more events matching the query. Incomplete pages can be detected by a non-empty nextPageToken field in the response. By default the value is 250 events. The page size can never be larger than 2500 events. Optional."),
  orderBy: z.enum(["startTime", "updated"]).optional().describe("The order of the events returned in the result. Optional. The default is an unspecified, stable order."),
  pageToken: z.string().optional().describe("Token specifying which result page to return. Optional."),
  privateExtendedProperty: z.array(z.string()).optional().describe("Extended properties constraint specified as propertyName=value. Matches only private properties. This parameter might be repeated multiple times to return events that match all given constraints."),
  q: z.string().optional().describe("Free text search terms to find events that match these terms in the following fields: summary, description, location, attendee's displayName, attendee's email. Optional."),
  sharedExtendedProperty: z.array(z.string()).optional().describe("Extended properties constraint specified as propertyName=value. Matches only shared properties. This parameter might be repeated multiple times to return events that match all given constraints."),
  showDeleted: z.boolean().optional().describe("Whether to include deleted events (with status equals \"cancelled\") in the result. Cancelled instances of recurring events (but not the underlying recurring event) will still be included if showDeleted and singleEvents are both False. If showDeleted and singleEvents are both True, only single instances of deleted events (but not the underlying recurring events) are returned. Optional. The default is False."),
  showHiddenInvitations: z.boolean().optional().describe("Whether to include hidden invitations in the result. Optional. The default is False."),
  singleEvents: z.boolean().optional().describe("Whether to expand recurring events into instances and only return single one-off events and instances of recurring events, but not the underlying recurring events themselves. Optional. The default is False."),
  syncToken: z.string().optional().describe("Token obtained from the nextSyncToken field returned on the last page of results from the previous list request. It makes the result of this list request contain only entries that have changed since then. All events deleted since the previous list request will always be in the result set and it is not allowed to set showDeleted to False.\nThere are several query parameters that cannot be specified together with nextSyncToken to ensure consistency of the client state.\n\nThese are: \n- iCalUID \n- orderBy \n- privateExtendedProperty \n- q \n- sharedExtendedProperty \n- timeMin \n- timeMax \n- updatedMin If the syncToken expires, the server will respond with a 410 GONE response code and the client should clear its storage and perform a full synchronization without any syncToken.\nLearn more about incremental synchronization.\nOptional. The default is to return all entries."),
  timeMax: z.string().optional().describe("Upper bound (exclusive) for an event's start time to filter by. Optional. The default is not to filter by start time. Must be an RFC3339 timestamp with mandatory time zone offset, for example, 2011-06-03T10:00:00-07:00, 2011-06-03T10:00:00Z. Milliseconds may be provided but are ignored. If timeMin is set, timeMax must be greater than timeMin."),
  timeMin: z.string().optional().describe("Lower bound (exclusive) for an event's end time to filter by. Optional. The default is not to filter by end time. Must be an RFC3339 timestamp with mandatory time zone offset, for example, 2011-06-03T10:00:00-07:00, 2011-06-03T10:00:00Z. Milliseconds may be provided but are ignored. If timeMax is set, timeMin must be smaller than timeMax."),
  timeZone: z.string().optional().describe("Time zone used in the response. Optional. The default is the time zone of the calendar."),
  updatedMin: z.string().optional().describe("Lower bound for an event's last modification time (as a RFC3339 timestamp) to filter by. When specified, entries deleted since this time will always be included regardless of showDeleted. Optional. The default is not to filter by last modification time."),
  address: z.string().optional().describe("The address where notifications are delivered for this channel."),
  expiration: z.string().optional().describe("Date and time of notification channel expiration, expressed as a Unix timestamp, in milliseconds. Optional."),
  id: z.string().optional().describe("A UUID or similar unique string that identifies this channel."),
  kind: z.string().optional().default("api#channel").describe("Identifies this as a notification channel used to watch for changes to a resource, which is \"api#channel\"."),
  params: z.record(z.string(), z.string().describe("Declares a new parameter by name.")).optional().describe("Additional parameters controlling delivery channel behavior. Optional."),
  payload: z.boolean().optional().describe("A Boolean value to indicate whether payload is wanted. Optional."),
  resourceId: z.string().optional().describe("An opaque ID that identifies the resource being watched on this channel. Stable across different API versions."),
  resourceUri: z.string().optional().describe("A version-specific identifier for the watched resource."),
  token: z.string().optional().describe("An arbitrary string delivered to the target address with each notification delivered over this channel. Optional."),
  type: z.string().optional().describe("The type of delivery mechanism used for this channel. Valid values are \"web_hook\" (or \"webhook\"). Both values refer to a channel where Http requests are used to deliver messages."),
})

export const EventsWatchOutput = z.object({
  address: z.string().optional().describe("The address where notifications are delivered for this channel."),
  expiration: z.string().optional().describe("Date and time of notification channel expiration, expressed as a Unix timestamp, in milliseconds. Optional."),
  id: z.string().optional().describe("A UUID or similar unique string that identifies this channel."),
  kind: z.string().optional().default("api#channel").describe("Identifies this as a notification channel used to watch for changes to a resource, which is \"api#channel\"."),
  params: z.record(z.string(), z.string().describe("Declares a new parameter by name.")).optional().describe("Additional parameters controlling delivery channel behavior. Optional."),
  payload: z.boolean().optional().describe("A Boolean value to indicate whether payload is wanted. Optional."),
  resourceId: z.string().optional().describe("An opaque ID that identifies the resource being watched on this channel. Stable across different API versions."),
  resourceUri: z.string().optional().describe("A version-specific identifier for the watched resource."),
  token: z.string().optional().describe("An arbitrary string delivered to the target address with each notification delivered over this channel. Optional."),
  type: z.string().optional().describe("The type of delivery mechanism used for this channel. Valid values are \"web_hook\" (or \"webhook\"). Both values refer to a channel where Http requests are used to deliver messages."),
})

export const eventsWatch = pikkuSessionlessFunc({
  description: "Watch for changes to Events resources.",
  input: EventsWatchInput,
  output: EventsWatchOutput,
  func: async ({ googleCalendar }, data) => {
    return googleCalendar.call("POST", "/calendars/{calendarId}/events/watch", data) as any
  },
})
