import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const CalendarListGetInput = z.object({
  calendarId: z.string().describe("Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the \"primary\" keyword."),
  alt: z.literal("json").optional().describe("Data format for the response."),
  fields: z.string().optional().describe("Selector specifying which fields to include in a partial response."),
  key: z.string().optional().describe("API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token."),
  oauth_token: z.string().optional().describe("OAuth 2.0 token for the current user."),
  prettyPrint: z.boolean().optional().describe("Returns response with indentations and line breaks."),
  quotaUser: z.string().optional().describe("An opaque string that represents a user for quota purposes. Must not exceed 40 characters."),
  userIp: z.string().optional().describe("Deprecated. Please use quotaUser instead."),
})

export const CalendarListGetOutput = z.object({
  accessRole: z.string().optional().describe("The effective access role that the authenticated user has on the calendar. Read-only. Possible values are:  \n- \"freeBusyReader\" - Provides read access to free/busy information. \n- \"reader\" - Provides read access to the calendar. Private events will appear to users with reader access, but event details will be hidden. \n- \"writer\" - Provides read and write access to the calendar. Private events will appear to users with writer access, and event details will be visible. \n- \"owner\" - Provides ownership of the calendar. This role has all of the permissions of the writer role with the additional ability to see and manipulate ACLs."),
  backgroundColor: z.string().optional().describe("The main color of the calendar in the hexadecimal format \"#0088aa\". This property supersedes the index-based colorId property. To set or change this property, you need to specify colorRgbFormat=true in the parameters of the insert, update and patch methods. Optional."),
  colorId: z.string().optional().describe("The color of the calendar. This is an ID referring to an entry in the calendar section of the colors definition (see the colors endpoint). This property is superseded by the backgroundColor and foregroundColor properties and can be ignored when using these properties. Optional."),
  conferenceProperties: z.object({
    allowedConferenceSolutionTypes: z.array(z.string()).optional().describe("The types of conference solutions that are supported for this calendar.\nThe possible values are:  \n- \"eventHangout\" \n- \"eventNamedHangout\" \n- \"hangoutsMeet\"  Optional."),
  }).optional().describe("Conferencing properties for this calendar, for example what types of conferences are allowed."),
  defaultReminders: z.array(z.object({
    method: z.string().optional().describe("The method used by this reminder. Possible values are:  \n- \"email\" - Reminders are sent via email. \n- \"popup\" - Reminders are sent via a UI popup.  \nRequired when adding a reminder."),
    minutes: z.number().int().optional().describe("Number of minutes before the start of the event when the reminder should trigger. Valid values are between 0 and 40320 (4 weeks in minutes).\nRequired when adding a reminder."),
  })).optional().describe("The default reminders that the authenticated user has for this calendar."),
  deleted: z.boolean().optional().default(false).describe("Whether this calendar list entry has been deleted from the calendar list. Read-only. Optional. The default is False."),
  description: z.string().optional().describe("Description of the calendar. Optional. Read-only."),
  etag: z.string().optional().describe("ETag of the resource."),
  foregroundColor: z.string().optional().describe("The foreground color of the calendar in the hexadecimal format \"#ffffff\". This property supersedes the index-based colorId property. To set or change this property, you need to specify colorRgbFormat=true in the parameters of the insert, update and patch methods. Optional."),
  hidden: z.boolean().optional().default(false).describe("Whether the calendar has been hidden from the list. Optional. The attribute is only returned when the calendar is hidden, in which case the value is true."),
  id: z.string().optional().describe("Identifier of the calendar."),
  kind: z.string().optional().default("calendar#calendarListEntry").describe("Type of the resource (\"calendar#calendarListEntry\")."),
  location: z.string().optional().describe("Geographic location of the calendar as free-form text. Optional. Read-only."),
  notificationSettings: z.object({
    notifications: z.array(z.object({
      method: z.string().optional().describe("The method used to deliver the notification. The possible value is:  \n- \"email\" - Notifications are sent via email.  \nRequired when adding a notification."),
      type: z.string().optional().describe("The type of notification. Possible values are:  \n- \"eventCreation\" - Notification sent when a new event is put on the calendar. \n- \"eventChange\" - Notification sent when an event is changed. \n- \"eventCancellation\" - Notification sent when an event is cancelled. \n- \"eventResponse\" - Notification sent when an attendee responds to the event invitation. \n- \"agenda\" - An agenda with the events of the day (sent out in the morning).  \nRequired when adding a notification."),
    })).optional().describe("The list of notifications set for this calendar."),
  }).optional().describe("The notifications that the authenticated user is receiving for this calendar."),
  primary: z.boolean().optional().default(false).describe("Whether the calendar is the primary calendar of the authenticated user. Read-only. Optional. The default is False."),
  selected: z.boolean().optional().default(false).describe("Whether the calendar content shows up in the calendar UI. Optional. The default is False."),
  summary: z.string().optional().describe("Title of the calendar. Read-only."),
  summaryOverride: z.string().optional().describe("The summary that the authenticated user has set for this calendar. Optional."),
  timeZone: z.string().optional().describe("The time zone of the calendar. Optional. Read-only."),
})

export const calendarListGet = pikkuSessionlessFunc({
  description: "Returns a calendar from the user's calendar list.",
  input: CalendarListGetInput,
  output: CalendarListGetOutput,
  func: async ({ googleCalendar }, data) => {
    return googleCalendar.call("GET", "/users/me/calendarList/{calendarId}", data) as any
  },
})
