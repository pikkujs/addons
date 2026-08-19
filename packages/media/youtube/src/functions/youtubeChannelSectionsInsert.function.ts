import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const YoutubeChannelSectionsInsertInput = z.object({
  "$.xgafv": z.enum(["1", "2"]).optional().describe("V1 error format."),
  access_token: z.string().optional().describe("OAuth access token."),
  alt: z.enum(["json", "media", "proto"]).optional().describe("Data format for response."),
  callback: z.string().optional().describe("JSONP"),
  fields: z.string().optional().describe("Selector specifying which fields to include in a partial response."),
  key: z.string().optional().describe("API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token."),
  oauth_token: z.string().optional().describe("OAuth 2.0 token for the current user."),
  prettyPrint: z.boolean().optional().describe("Returns response with indentations and line breaks."),
  quotaUser: z.string().optional().describe("Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters."),
  upload_protocol: z.string().optional().describe("Upload protocol for media (e.g. \"raw\", \"multipart\")."),
  uploadType: z.string().optional().describe("Legacy upload protocol for media (e.g. \"media\", \"multipart\")."),
  part: z.array(z.string()).describe("The *part* parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response will include. The part names that you can include in the parameter value are snippet and contentDetails."),
  onBehalfOfContentOwner: z.string().optional().describe("*Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner."),
  onBehalfOfContentOwnerChannel: z.string().optional().describe("This parameter can only be used in a properly authorized request. *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a value for the onBehalfOfContentOwner parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that is linked to the content owner that the onBehalfOfContentOwner parameter specifies. Finally, the channel that the onBehalfOfContentOwnerChannel parameter value specifies must be linked to the content owner that the onBehalfOfContentOwner parameter specifies. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide authentication credentials for each separate channel."),
  contentDetails: z.object({
  channels: z.array(z.string()).optional().describe("The channel ids for type multiple_channels."),
  playlists: z.array(z.string()).optional().describe("The playlist ids for type single_playlist and multiple_playlists. For singlePlaylist, only one playlistId is allowed."),
}).optional().describe("The contentDetails object contains details about the channel section content, such as a list of playlists or channels featured in the section."),
  etag: z.string().optional().describe("Etag of this resource."),
  id: z.string().optional().describe("The ID that YouTube uses to uniquely identify the channel section."),
  kind: z.string().optional().default("youtube#channelSection").describe("Identifies what kind of resource this is. Value: the fixed string \"youtube#channelSection\"."),
  localizations: z.record(z.string(), z.object({
  title: z.string().optional().describe("The localized strings for channel section's title."),
}).describe("ChannelSection localization setting")).optional().describe("Localizations for different languages"),
  snippet: z.object({
  channelId: z.string().optional().describe("The ID that YouTube uses to uniquely identify the channel that published the channel section."),
  defaultLanguage: z.string().optional().describe("The language of the channel section's default title and description."),
  localized: z.object({
    title: z.string().optional().describe("The localized strings for channel section's title."),
  }).optional().describe("Localized title, read-only."),
  position: z.number().int().optional().describe("The position of the channel section in the channel."),
  style: z.enum(["channelsectionStyleUnspecified", "horizontalRow", "verticalList"]).optional().describe("The style of the channel section."),
  title: z.string().optional().describe("The channel section's title for multiple_playlists and multiple_channels."),
  type: z.enum(["channelsectionTypeUndefined", "singlePlaylist", "multiplePlaylists", "popularUploads", "recentUploads", "likes", "allPlaylists", "likedPlaylists", "recentPosts", "recentActivity", "liveEvents", "upcomingEvents", "completedEvents", "multipleChannels", "postedVideos", "postedPlaylists", "subscriptions"]).optional().describe("The type of the channel section."),
}).optional().describe("The snippet object contains basic details about the channel section, such as its type, style and title."),
  targeting: z.object({
  countries: z.array(z.string()).optional().describe("The country the channel section is targeting."),
  languages: z.array(z.string()).optional().describe("The language the channel section is targeting."),
  regions: z.array(z.string()).optional().describe("The region the channel section is targeting."),
}).optional().describe("The targeting object contains basic targeting settings about the channel section."),
})

export const YoutubeChannelSectionsInsertOutput = z.object({
  contentDetails: z.object({
    channels: z.array(z.string()).optional().describe("The channel ids for type multiple_channels."),
    playlists: z.array(z.string()).optional().describe("The playlist ids for type single_playlist and multiple_playlists. For singlePlaylist, only one playlistId is allowed."),
  }).optional().describe("The contentDetails object contains details about the channel section content, such as a list of playlists or channels featured in the section."),
  etag: z.string().optional().describe("Etag of this resource."),
  id: z.string().optional().describe("The ID that YouTube uses to uniquely identify the channel section."),
  kind: z.string().optional().default("youtube#channelSection").describe("Identifies what kind of resource this is. Value: the fixed string \"youtube#channelSection\"."),
  localizations: z.record(z.string(), z.object({
    title: z.string().optional().describe("The localized strings for channel section's title."),
  }).describe("ChannelSection localization setting")).optional().describe("Localizations for different languages"),
  snippet: z.object({
    channelId: z.string().optional().describe("The ID that YouTube uses to uniquely identify the channel that published the channel section."),
    defaultLanguage: z.string().optional().describe("The language of the channel section's default title and description."),
    localized: z.object({
      title: z.string().optional().describe("The localized strings for channel section's title."),
    }).optional().describe("Localized title, read-only."),
    position: z.number().int().optional().describe("The position of the channel section in the channel."),
    style: z.enum(["channelsectionStyleUnspecified", "horizontalRow", "verticalList"]).optional().describe("The style of the channel section."),
    title: z.string().optional().describe("The channel section's title for multiple_playlists and multiple_channels."),
    type: z.enum(["channelsectionTypeUndefined", "singlePlaylist", "multiplePlaylists", "popularUploads", "recentUploads", "likes", "allPlaylists", "likedPlaylists", "recentPosts", "recentActivity", "liveEvents", "upcomingEvents", "completedEvents", "multipleChannels", "postedVideos", "postedPlaylists", "subscriptions"]).optional().describe("The type of the channel section."),
  }).optional().describe("The snippet object contains basic details about the channel section, such as its type, style and title."),
  targeting: z.object({
    countries: z.array(z.string()).optional().describe("The country the channel section is targeting."),
    languages: z.array(z.string()).optional().describe("The language the channel section is targeting."),
    regions: z.array(z.string()).optional().describe("The region the channel section is targeting."),
  }).optional().describe("The targeting object contains basic targeting settings about the channel section."),
})

export const youtubeChannelSectionsInsert = pikkuSessionlessFunc({
  description: "Inserts a new resource into this collection.",
  input: YoutubeChannelSectionsInsertInput,
  output: YoutubeChannelSectionsInsertOutput,
  func: async ({ youtube }, data) => {
    return youtube.call("POST", "/youtube/v3/channelSections", data) as any
  },
})
