import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const YoutubePlaylistsListInput = z.object({
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
  part: z.array(z.string()).describe("The *part* parameter specifies a comma-separated list of one or more playlist resource properties that the API response will include. If the parameter identifies a property that contains child properties, the child properties will be included in the response. For example, in a playlist resource, the snippet property contains properties like author, title, description, tags, and timeCreated. As such, if you set *part=snippet*, the API response will contain all of those properties."),
  channelId: z.string().optional().describe("Return the playlists owned by the specified channel ID."),
  hl: z.string().optional().describe("Return content in specified language"),
  id: z.array(z.string()).optional().describe("Return the playlists with the given IDs for Stubby or Apiary."),
  maxResults: z.number().int().min(0).max(50).optional().describe("The *maxResults* parameter specifies the maximum number of items that should be returned in the result set."),
  mine: z.boolean().optional().describe("Return the playlists owned by the authenticated user."),
  onBehalfOfContentOwner: z.string().optional().describe("*Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner."),
  onBehalfOfContentOwnerChannel: z.string().optional().describe("This parameter can only be used in a properly authorized request. *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a value for the onBehalfOfContentOwner parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that is linked to the content owner that the onBehalfOfContentOwner parameter specifies. Finally, the channel that the onBehalfOfContentOwnerChannel parameter value specifies must be linked to the content owner that the onBehalfOfContentOwner parameter specifies. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide authentication credentials for each separate channel."),
  pageToken: z.string().optional().describe("The *pageToken* parameter identifies a specific page in the result set that should be returned. In an API response, the nextPageToken and prevPageToken properties identify other pages that could be retrieved."),
})

export const YoutubePlaylistsListOutput = z.object({
  etag: z.string().optional().describe("Etag of this resource."),
  eventId: z.string().optional().describe("Serialized EventId of the request which produced this response."),
  items: z.array(z.object({
    contentDetails: z.object({
      itemCount: z.number().int().optional().describe("The number of videos in the playlist."),
    }).optional().describe("The contentDetails object contains information like video count."),
    etag: z.string().optional().describe("Etag of this resource."),
    id: z.string().optional().describe("The ID that YouTube uses to uniquely identify the playlist."),
    kind: z.string().optional().default("youtube#playlist").describe("Identifies what kind of resource this is. Value: the fixed string \"youtube#playlist\"."),
    localizations: z.record(z.string(), z.object({
      description: z.string().optional().describe("The localized strings for playlist's description."),
      title: z.string().optional().describe("The localized strings for playlist's title."),
    }).describe("Playlist localization setting")).optional().describe("Localizations for different languages"),
    player: z.object({
      embedHtml: z.string().optional().describe("An <iframe> tag that embeds a player that will play the playlist."),
    }).optional().describe("The player object contains information that you would use to play the playlist in an embedded player."),
    snippet: z.object({
      channelId: z.string().optional().describe("The ID that YouTube uses to uniquely identify the channel that published the playlist."),
      channelTitle: z.string().optional().describe("The channel title of the channel that the video belongs to."),
      defaultLanguage: z.string().optional().describe("The language of the playlist's default title and description."),
      description: z.string().optional().describe("The playlist's description."),
      localized: z.object({
        description: z.string().optional().describe("The localized strings for playlist's description."),
        title: z.string().optional().describe("The localized strings for playlist's title."),
      }).optional().describe("Localized title and description, read-only."),
      publishedAt: z.string().datetime().optional().describe("The date and time that the playlist was created."),
      tags: z.array(z.string()).optional().describe("Keyword tags associated with the playlist."),
      thumbnailVideoId: z.string().optional().describe("Note: if the playlist has a custom thumbnail, this field will not be populated. The video id selected by the user that will be used as the thumbnail of this playlist. This field defaults to the first publicly viewable video in the playlist, if: 1. The user has never selected a video to be the thumbnail of the playlist. 2. The user selects a video to be the thumbnail, and then removes that video from the playlist. 3. The user selects a non-owned video to be the thumbnail, but that video becomes private, or gets deleted."),
      thumbnails: z.object({
        high: z.object({
          height: z.number().int().optional().describe("(Optional) Height of the thumbnail image."),
          url: z.string().optional().describe("The thumbnail image's URL."),
          width: z.number().int().optional().describe("(Optional) Width of the thumbnail image."),
        }).optional().describe("The high quality image for this resource."),
        maxres: z.object({
          height: z.number().int().optional().describe("(Optional) Height of the thumbnail image."),
          url: z.string().optional().describe("The thumbnail image's URL."),
          width: z.number().int().optional().describe("(Optional) Width of the thumbnail image."),
        }).optional().describe("The maximum resolution quality image for this resource."),
        medium: z.object({
          height: z.number().int().optional().describe("(Optional) Height of the thumbnail image."),
          url: z.string().optional().describe("The thumbnail image's URL."),
          width: z.number().int().optional().describe("(Optional) Width of the thumbnail image."),
        }).optional().describe("The medium quality image for this resource."),
        standard: z.object({
          height: z.number().int().optional().describe("(Optional) Height of the thumbnail image."),
          url: z.string().optional().describe("The thumbnail image's URL."),
          width: z.number().int().optional().describe("(Optional) Width of the thumbnail image."),
        }).optional().describe("The standard quality image for this resource."),
      }).optional().describe("A map of thumbnail images associated with the playlist. For each object in the map, the key is the name of the thumbnail image, and the value is an object that contains other information about the thumbnail."),
      title: z.string().optional().describe("The playlist's title."),
    }).optional().describe("The snippet object contains basic details about the playlist, such as its title and description."),
    status: z.object({
      privacyStatus: z.enum(["public", "unlisted", "private"]).optional().describe("The playlist's privacy status."),
    }).optional().describe("The status object contains status information for the playlist."),
  })).optional().describe("A list of playlists that match the request criteria"),
  kind: z.string().optional().default("youtube#playlistListResponse").describe("Identifies what kind of resource this is. Value: the fixed string \"youtube#playlistListResponse\"."),
  nextPageToken: z.string().optional().describe("The token that can be used as the value of the pageToken parameter to retrieve the next page in the result set."),
  pageInfo: z.object({
    resultsPerPage: z.number().int().optional().describe("The number of results included in the API response."),
    totalResults: z.number().int().optional().describe("The total number of results in the result set."),
  }).optional().describe("General pagination information."),
  prevPageToken: z.string().optional().describe("The token that can be used as the value of the pageToken parameter to retrieve the previous page in the result set."),
  tokenPagination: z.record(z.string(), z.unknown()).optional().describe("Stub token pagination template to suppress results."),
  visitorId: z.string().optional().describe("The visitorId identifies the visitor."),
})

export const youtubePlaylistsList = pikkuSessionlessFunc({
  description: "Retrieves a list of resources, possibly filtered.",
  input: YoutubePlaylistsListInput,
  output: YoutubePlaylistsListOutput,
  func: async ({ youtube }, data) => {
    return youtube.call("GET", "/youtube/v3/playlists", data) as any
  },
})
