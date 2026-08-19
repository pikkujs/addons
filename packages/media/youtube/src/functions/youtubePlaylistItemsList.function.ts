import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const YoutubePlaylistItemsListInput = z.object({
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
  part: z.array(z.string()).describe("The *part* parameter specifies a comma-separated list of one or more playlistItem resource properties that the API response will include. If the parameter identifies a property that contains child properties, the child properties will be included in the response. For example, in a playlistItem resource, the snippet property contains numerous fields, including the title, description, position, and resourceId properties. As such, if you set *part=snippet*, the API response will contain all of those properties."),
  id: z.array(z.string()).optional(),
  maxResults: z.number().int().min(0).max(50).optional().describe("The *maxResults* parameter specifies the maximum number of items that should be returned in the result set."),
  onBehalfOfContentOwner: z.string().optional().describe("*Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner."),
  pageToken: z.string().optional().describe("The *pageToken* parameter identifies a specific page in the result set that should be returned. In an API response, the nextPageToken and prevPageToken properties identify other pages that could be retrieved."),
  playlistId: z.string().optional().describe("Return the playlist items within the given playlist."),
  videoId: z.string().optional().describe("Return the playlist items associated with the given video ID."),
})

export const YoutubePlaylistItemsListOutput = z.object({
  etag: z.string().optional(),
  eventId: z.string().optional().describe("Serialized EventId of the request which produced this response."),
  items: z.array(z.object({
    contentDetails: z.object({
      endAt: z.string().optional().describe("The time, measured in seconds from the start of the video, when the video should stop playing. (The playlist owner can specify the times when the video should start and stop playing when the video is played in the context of the playlist.) By default, assume that the video.endTime is the end of the video."),
      note: z.string().optional().describe("A user-generated note for this item."),
      startAt: z.string().optional().describe("The time, measured in seconds from the start of the video, when the video should start playing. (The playlist owner can specify the times when the video should start and stop playing when the video is played in the context of the playlist.) The default value is 0."),
      videoId: z.string().optional().describe("The ID that YouTube uses to uniquely identify a video. To retrieve the video resource, set the id query parameter to this value in your API request."),
      videoPublishedAt: z.string().datetime().optional().describe("The date and time that the video was published to YouTube."),
    }).optional().describe("The contentDetails object is included in the resource if the included item is a YouTube video. The object contains additional information about the video."),
    etag: z.string().optional().describe("Etag of this resource."),
    id: z.string().optional().describe("The ID that YouTube uses to uniquely identify the playlist item."),
    kind: z.string().optional().default("youtube#playlistItem").describe("Identifies what kind of resource this is. Value: the fixed string \"youtube#playlistItem\"."),
    snippet: z.object({
      channelId: z.string().optional().describe("The ID that YouTube uses to uniquely identify the user that added the item to the playlist."),
      channelTitle: z.string().optional().describe("Channel title for the channel that the playlist item belongs to."),
      description: z.string().optional().describe("The item's description."),
      playlistId: z.string().optional().describe("The ID that YouTube uses to uniquely identify thGe playlist that the playlist item is in."),
      position: z.number().int().optional().describe("The order in which the item appears in the playlist. The value uses a zero-based index, so the first item has a position of 0, the second item has a position of 1, and so forth."),
      publishedAt: z.string().datetime().optional().describe("The date and time that the item was added to the playlist."),
      resourceId: z.object({
        channelId: z.string().optional().describe("The ID that YouTube uses to uniquely identify the referred resource, if that resource is a channel. This property is only present if the resourceId.kind value is youtube#channel."),
        kind: z.string().optional().describe("The type of the API resource."),
        playlistId: z.string().optional().describe("The ID that YouTube uses to uniquely identify the referred resource, if that resource is a playlist. This property is only present if the resourceId.kind value is youtube#playlist."),
        videoId: z.string().optional().describe("The ID that YouTube uses to uniquely identify the referred resource, if that resource is a video. This property is only present if the resourceId.kind value is youtube#video."),
      }).optional().describe("The id object contains information that can be used to uniquely identify the resource that is included in the playlist as the playlist item."),
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
      }).optional().describe("A map of thumbnail images associated with the playlist item. For each object in the map, the key is the name of the thumbnail image, and the value is an object that contains other information about the thumbnail."),
      title: z.string().optional().describe("The item's title."),
      videoOwnerChannelId: z.string().optional().describe("Channel id for the channel this video belongs to."),
      videoOwnerChannelTitle: z.string().optional().describe("Channel title for the channel this video belongs to."),
    }).optional().describe("The snippet object contains basic details about the playlist item, such as its title and position in the playlist."),
    status: z.object({
      privacyStatus: z.enum(["public", "unlisted", "private"]).optional().describe("This resource's privacy status."),
    }).optional().describe("The status object contains information about the playlist item's privacy status."),
  })).optional().describe("A list of playlist items that match the request criteria."),
  kind: z.string().optional().default("youtube#playlistItemListResponse").describe("Identifies what kind of resource this is. Value: the fixed string \"youtube#playlistItemListResponse\". Etag of this resource."),
  nextPageToken: z.string().optional().describe("The token that can be used as the value of the pageToken parameter to retrieve the next page in the result set."),
  pageInfo: z.object({
    resultsPerPage: z.number().int().optional().describe("The number of results included in the API response."),
    totalResults: z.number().int().optional().describe("The total number of results in the result set."),
  }).optional().describe("General pagination information."),
  prevPageToken: z.string().optional().describe("The token that can be used as the value of the pageToken parameter to retrieve the previous page in the result set."),
  tokenPagination: z.record(z.string(), z.unknown()).optional().describe("Stub token pagination template to suppress results."),
  visitorId: z.string().optional().describe("The visitorId identifies the visitor."),
})

export const youtubePlaylistItemsList = pikkuSessionlessFunc({
  description: "Retrieves a list of resources, possibly filtered.",
  input: YoutubePlaylistItemsListInput,
  output: YoutubePlaylistItemsListOutput,
  func: async ({ youtube }, data) => {
    return youtube.call("GET", "/youtube/v3/playlistItems", data) as any
  },
})
