import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ChangesWatchInput = z.object({
  alt: z.literal("json").optional().describe("Data format for the response."),
  fields: z.string().optional().describe("Selector specifying which fields to include in a partial response."),
  key: z.string().optional().describe("API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token."),
  oauth_token: z.string().optional().describe("OAuth 2.0 token for the current user."),
  prettyPrint: z.boolean().optional().describe("Returns response with indentations and line breaks."),
  quotaUser: z.string().optional().describe("An opaque string that represents a user for quota purposes. Must not exceed 40 characters."),
  userIp: z.string().optional().describe("Deprecated. Please use quotaUser instead."),
  pageToken: z.string().describe("The token for continuing a previous list request on the next page. This should be set to the value of 'nextPageToken' from the previous response or to the response from the getStartPageToken method."),
  driveId: z.string().optional().describe("The shared drive from which changes are returned. If specified the change IDs will be reflective of the shared drive; use the combined drive ID and change ID as an identifier."),
  includeCorpusRemovals: z.boolean().optional().describe("Whether changes should include the file resource if the file is still accessible by the user at the time of the request, even when a file was removed from the list of changes and there will be no further change entries for this file."),
  includeItemsFromAllDrives: z.boolean().optional().describe("Whether both My Drive and shared drive items should be included in results."),
  includeLabels: z.string().optional().describe("A comma-separated list of IDs of labels to include in the labelInfo part of the response."),
  includePermissionsForView: z.string().optional().describe("Specifies which additional view's permissions to include in the response. Only 'published' is supported."),
  includeRemoved: z.boolean().optional().describe("Whether to include changes indicating that items have been removed from the list of changes, for example by deletion or loss of access."),
  includeTeamDriveItems: z.boolean().optional().describe("Deprecated use includeItemsFromAllDrives instead."),
  pageSize: z.number().int().min(1).max(1000).optional().describe("The maximum number of changes to return per page."),
  restrictToMyDrive: z.boolean().optional().describe("Whether to restrict the results to changes inside the My Drive hierarchy. This omits changes to files such as those in the Application Data folder or shared files which have not been added to My Drive."),
  spaces: z.string().optional().describe("A comma-separated list of spaces to query within the corpora. Supported values are 'drive' and 'appDataFolder'."),
  supportsAllDrives: z.boolean().optional().describe("Whether the requesting application supports both My Drives and shared drives."),
  supportsTeamDrives: z.boolean().optional().describe("Deprecated use supportsAllDrives instead."),
  teamDriveId: z.string().optional().describe("Deprecated use driveId instead."),
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

export const ChangesWatchOutput = z.object({
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
}).describe("An notification channel used to watch for resource changes.")

export const changesWatch = pikkuSessionlessFunc({
  description: "Subscribes to changes for a user. To use this method, you must include the pageToken query parameter.",
  input: ChangesWatchInput,
  output: ChangesWatchOutput,
  func: async ({ googleDrive }, data) => {
    return googleDrive.call("POST", "/changes/watch", data) as any
  },
})
