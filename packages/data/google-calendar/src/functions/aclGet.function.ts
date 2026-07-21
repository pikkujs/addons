import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const AclGetInput = z.object({
  calendarId: z.string().describe("Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the \"primary\" keyword."),
  ruleId: z.string().describe("ACL rule identifier."),
  alt: z.literal("json").optional().describe("Data format for the response."),
  fields: z.string().optional().describe("Selector specifying which fields to include in a partial response."),
  key: z.string().optional().describe("API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token."),
  oauth_token: z.string().optional().describe("OAuth 2.0 token for the current user."),
  prettyPrint: z.boolean().optional().describe("Returns response with indentations and line breaks."),
  quotaUser: z.string().optional().describe("An opaque string that represents a user for quota purposes. Must not exceed 40 characters."),
  userIp: z.string().optional().describe("Deprecated. Please use quotaUser instead."),
})

export const AclGetOutput = z.object({
  etag: z.string().optional().describe("ETag of the resource."),
  id: z.string().optional().describe("Identifier of the Access Control List (ACL) rule. See Sharing calendars."),
  kind: z.string().optional().default("calendar#aclRule").describe("Type of the resource (\"calendar#aclRule\")."),
  role: z.string().optional().describe("The role assigned to the scope. Possible values are:  \n- \"none\" - Provides no access. \n- \"freeBusyReader\" - Provides read access to free/busy information. \n- \"reader\" - Provides read access to the calendar. Private events will appear to users with reader access, but event details will be hidden. \n- \"writer\" - Provides read and write access to the calendar. Private events will appear to users with writer access, and event details will be visible. \n- \"owner\" - Provides ownership of the calendar. This role has all of the permissions of the writer role with the additional ability to see and manipulate ACLs."),
  scope: z.object({
    type: z.string().optional().describe("The type of the scope. Possible values are:  \n- \"default\" - The public scope. This is the default value. \n- \"user\" - Limits the scope to a single user. \n- \"group\" - Limits the scope to a group. \n- \"domain\" - Limits the scope to a domain.  Note: The permissions granted to the \"default\", or public, scope apply to any user, authenticated or not."),
    value: z.string().optional().describe("The email address of a user or group, or the name of a domain, depending on the scope type. Omitted for type \"default\"."),
  }).optional().describe("The extent to which calendar access is granted by this ACL rule."),
})

export const aclGet = pikkuSessionlessFunc({
  description: "Returns an access control rule.",
  input: AclGetInput,
  output: AclGetOutput,
  func: async ({ googleCalendar }, data) => {
    return googleCalendar.call("GET", "/calendars/{calendarId}/acl/{ruleId}", data) as any
  },
})
