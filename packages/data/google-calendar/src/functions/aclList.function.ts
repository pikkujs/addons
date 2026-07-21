import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const AclListInput = z.object({
  calendarId: z.string().describe("Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the \"primary\" keyword."),
  alt: z.literal("json").optional().describe("Data format for the response."),
  fields: z.string().optional().describe("Selector specifying which fields to include in a partial response."),
  key: z.string().optional().describe("API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token."),
  oauth_token: z.string().optional().describe("OAuth 2.0 token for the current user."),
  prettyPrint: z.boolean().optional().describe("Returns response with indentations and line breaks."),
  quotaUser: z.string().optional().describe("An opaque string that represents a user for quota purposes. Must not exceed 40 characters."),
  userIp: z.string().optional().describe("Deprecated. Please use quotaUser instead."),
  maxResults: z.number().int().min(1).optional().describe("Maximum number of entries returned on one result page. By default the value is 100 entries. The page size can never be larger than 250 entries. Optional."),
  pageToken: z.string().optional().describe("Token specifying which result page to return. Optional."),
  showDeleted: z.boolean().optional().describe("Whether to include deleted ACLs in the result. Deleted ACLs are represented by role equal to \"none\". Deleted ACLs will always be included if syncToken is provided. Optional. The default is False."),
  syncToken: z.string().optional().describe("Token obtained from the nextSyncToken field returned on the last page of results from the previous list request. It makes the result of this list request contain only entries that have changed since then. All entries deleted since the previous list request will always be in the result set and it is not allowed to set showDeleted to False.\nIf the syncToken expires, the server will respond with a 410 GONE response code and the client should clear its storage and perform a full synchronization without any syncToken.\nLearn more about incremental synchronization.\nOptional. The default is to return all entries."),
})

export const AclListOutput = z.object({
  etag: z.string().optional().describe("ETag of the collection."),
  items: z.array(z.object({
    etag: z.string().optional().describe("ETag of the resource."),
    id: z.string().optional().describe("Identifier of the Access Control List (ACL) rule. See Sharing calendars."),
    kind: z.string().optional().default("calendar#aclRule").describe("Type of the resource (\"calendar#aclRule\")."),
    role: z.string().optional().describe("The role assigned to the scope. Possible values are:  \n- \"none\" - Provides no access. \n- \"freeBusyReader\" - Provides read access to free/busy information. \n- \"reader\" - Provides read access to the calendar. Private events will appear to users with reader access, but event details will be hidden. \n- \"writer\" - Provides read and write access to the calendar. Private events will appear to users with writer access, and event details will be visible. \n- \"owner\" - Provides ownership of the calendar. This role has all of the permissions of the writer role with the additional ability to see and manipulate ACLs."),
    scope: z.object({
      type: z.string().optional().describe("The type of the scope. Possible values are:  \n- \"default\" - The public scope. This is the default value. \n- \"user\" - Limits the scope to a single user. \n- \"group\" - Limits the scope to a group. \n- \"domain\" - Limits the scope to a domain.  Note: The permissions granted to the \"default\", or public, scope apply to any user, authenticated or not."),
      value: z.string().optional().describe("The email address of a user or group, or the name of a domain, depending on the scope type. Omitted for type \"default\"."),
    }).optional().describe("The extent to which calendar access is granted by this ACL rule."),
  })).optional().describe("List of rules on the access control list."),
  kind: z.string().optional().default("calendar#acl").describe("Type of the collection (\"calendar#acl\")."),
  nextPageToken: z.string().optional().describe("Token used to access the next page of this result. Omitted if no further results are available, in which case nextSyncToken is provided."),
  nextSyncToken: z.string().optional().describe("Token used at a later point in time to retrieve only the entries that have changed since this result was returned. Omitted if further results are available, in which case nextPageToken is provided."),
})

export const aclList = pikkuSessionlessFunc({
  description: "Returns the rules in the access control list for the calendar.",
  input: AclListInput,
  output: AclListOutput,
  func: async ({ googleCalendar }, data) => {
    return googleCalendar.call("GET", "/calendars/{calendarId}/acl", data) as any
  },
})
