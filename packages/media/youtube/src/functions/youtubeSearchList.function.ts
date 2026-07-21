import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const YoutubeSearchListInput = z.object({
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
  part: z.array(z.string()).describe("The *part* parameter specifies a comma-separated list of one or more search resource properties that the API response will include. Set the parameter value to snippet."),
  channelId: z.string().optional().describe("Filter on resources belonging to this channelId."),
  channelType: z.enum(["channelTypeUnspecified", "any", "show"]).optional().describe("Add a filter on the channel search."),
  eventType: z.enum(["none", "upcoming", "live", "completed"]).optional().describe("Filter on the livestream status of the videos."),
  forContentOwner: z.boolean().optional().describe("Search owned by a content owner."),
  forDeveloper: z.boolean().optional().describe("Restrict the search to only retrieve videos uploaded using the project id of the authenticated user."),
  forMine: z.boolean().optional().describe("Search for the private videos of the authenticated user."),
  location: z.string().optional().describe("Filter on location of the video"),
  locationRadius: z.string().optional().describe("Filter on distance from the location (specified above)."),
  maxResults: z.number().int().min(0).max(50).optional().describe("The *maxResults* parameter specifies the maximum number of items that should be returned in the result set."),
  onBehalfOfContentOwner: z.string().optional().describe("*Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner."),
  order: z.enum(["searchSortUnspecified", "date", "rating", "viewCount", "relevance", "title", "videoCount"]).optional().describe("Sort order of the results."),
  pageToken: z.string().optional().describe("The *pageToken* parameter identifies a specific page in the result set that should be returned. In an API response, the nextPageToken and prevPageToken properties identify other pages that could be retrieved."),
  publishedAfter: z.string().optional().describe("Filter on resources published after this date."),
  publishedBefore: z.string().optional().describe("Filter on resources published before this date."),
  q: z.string().optional().describe("Textual search terms to match."),
  regionCode: z.string().optional().describe("Display the content as seen by viewers in this country."),
  relatedToVideoId: z.string().optional().describe("Search related to a resource."),
  relevanceLanguage: z.string().optional().describe("Return results relevant to this language."),
  safeSearch: z.enum(["safeSearchSettingUnspecified", "none", "moderate", "strict"]).optional().describe("Indicates whether the search results should include restricted content as well as standard content."),
  topicId: z.string().optional().describe("Restrict results to a particular topic."),
  type: z.array(z.string()).optional().describe("Restrict results to a particular set of resource types from One Platform."),
  videoCaption: z.enum(["videoCaptionUnspecified", "any", "closedCaption", "none"]).optional().describe("Filter on the presence of captions on the videos."),
  videoCategoryId: z.string().optional().describe("Filter on videos in a specific category."),
  videoDefinition: z.enum(["any", "standard", "high"]).optional().describe("Filter on the definition of the videos."),
  videoDimension: z.enum(["any", "2d", "3d"]).optional().describe("Filter on 3d videos."),
  videoDuration: z.enum(["videoDurationUnspecified", "any", "short", "medium", "long"]).optional().describe("Filter on the duration of the videos."),
  videoEmbeddable: z.enum(["videoEmbeddableUnspecified", "any", "true"]).optional().describe("Filter on embeddable videos."),
  videoLicense: z.enum(["any", "youtube", "creativeCommon"]).optional().describe("Filter on the license of the videos."),
  videoSyndicated: z.enum(["videoSyndicatedUnspecified", "any", "true"]).optional().describe("Filter on syndicated videos."),
  videoType: z.enum(["videoTypeUnspecified", "any", "movie", "episode"]).optional().describe("Filter on videos of a specific type."),
})

export const YoutubeSearchListOutput = z.object({
  etag: z.string().optional().describe("Etag of this resource."),
  eventId: z.string().optional().describe("Serialized EventId of the request which produced this response."),
  items: z.array(z.object({
    etag: z.string().optional().describe("Etag of this resource."),
    id: z.object({
      channelId: z.string().optional().describe("The ID that YouTube uses to uniquely identify the referred resource, if that resource is a channel. This property is only present if the resourceId.kind value is youtube#channel."),
      kind: z.string().optional().describe("The type of the API resource."),
      playlistId: z.string().optional().describe("The ID that YouTube uses to uniquely identify the referred resource, if that resource is a playlist. This property is only present if the resourceId.kind value is youtube#playlist."),
      videoId: z.string().optional().describe("The ID that YouTube uses to uniquely identify the referred resource, if that resource is a video. This property is only present if the resourceId.kind value is youtube#video."),
    }).optional().describe("The id object contains information that can be used to uniquely identify the resource that matches the search request."),
    kind: z.string().optional().default("youtube#searchResult").describe("Identifies what kind of resource this is. Value: the fixed string \"youtube#searchResult\"."),
    snippet: z.object({
      channelId: z.string().optional().describe("The value that YouTube uses to uniquely identify the channel that published the resource that the search result identifies."),
      channelTitle: z.string().optional().describe("The title of the channel that published the resource that the search result identifies."),
      description: z.string().optional().describe("A description of the search result."),
      liveBroadcastContent: z.enum(["none", "upcoming", "live", "completed"]).optional().describe("It indicates if the resource (video or channel) has upcoming/active live broadcast content. Or it's \"none\" if there is not any upcoming/active live broadcasts."),
      publishedAt: z.string().datetime().optional().describe("The creation date and time of the resource that the search result identifies."),
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
      }).optional().describe("A map of thumbnail images associated with the search result. For each object in the map, the key is the name of the thumbnail image, and the value is an object that contains other information about the thumbnail."),
      title: z.string().optional().describe("The title of the search result."),
    }).optional().describe("The snippet object contains basic details about a search result, such as its title or description. For example, if the search result is a video, then the title will be the video's title and the description will be the video's description."),
  })).optional().describe("Pagination information for token pagination."),
  kind: z.string().optional().default("youtube#searchListResponse").describe("Identifies what kind of resource this is. Value: the fixed string \"youtube#searchListResponse\"."),
  nextPageToken: z.string().optional().describe("The token that can be used as the value of the pageToken parameter to retrieve the next page in the result set."),
  pageInfo: z.object({
    resultsPerPage: z.number().int().optional().describe("The number of results included in the API response."),
    totalResults: z.number().int().optional().describe("The total number of results in the result set."),
  }).optional().describe("General pagination information."),
  prevPageToken: z.string().optional().describe("The token that can be used as the value of the pageToken parameter to retrieve the previous page in the result set."),
  regionCode: z.string().optional(),
  tokenPagination: z.record(z.string(), z.unknown()).optional().describe("Stub token pagination template to suppress results."),
  visitorId: z.string().optional().describe("The visitorId identifies the visitor."),
})

export const youtubeSearchList = pikkuSessionlessFunc({
  description: "Retrieves a list of search resources",
  input: YoutubeSearchListInput,
  output: YoutubeSearchListOutput,
  func: async ({ youtube }, data) => {
    return youtube.call("GET", "/youtube/v3/search", data) as any
  },
})
