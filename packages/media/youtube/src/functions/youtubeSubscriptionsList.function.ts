import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const YoutubeSubscriptionsListInput = z.object({
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
  part: z.array(z.string()).describe("The *part* parameter specifies a comma-separated list of one or more subscription resource properties that the API response will include. If the parameter identifies a property that contains child properties, the child properties will be included in the response. For example, in a subscription resource, the snippet property contains other properties, such as a display title for the subscription. If you set *part=snippet*, the API response will also contain all of those nested properties."),
  channelId: z.string().optional().describe("Return the subscriptions of the given channel owner."),
  forChannelId: z.string().optional().describe("Return the subscriptions to the subset of these channels that the authenticated user is subscribed to."),
  id: z.array(z.string()).optional().describe("Return the subscriptions with the given IDs for Stubby or Apiary."),
  maxResults: z.number().int().min(0).max(50).optional().describe("The *maxResults* parameter specifies the maximum number of items that should be returned in the result set."),
  mine: z.boolean().optional().describe("Flag for returning the subscriptions of the authenticated user."),
  myRecentSubscribers: z.boolean().optional(),
  mySubscribers: z.boolean().optional().describe("Return the subscribers of the given channel owner."),
  onBehalfOfContentOwner: z.string().optional().describe("*Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner."),
  onBehalfOfContentOwnerChannel: z.string().optional().describe("This parameter can only be used in a properly authorized request. *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a value for the onBehalfOfContentOwner parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that is linked to the content owner that the onBehalfOfContentOwner parameter specifies. Finally, the channel that the onBehalfOfContentOwnerChannel parameter value specifies must be linked to the content owner that the onBehalfOfContentOwner parameter specifies. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide authentication credentials for each separate channel."),
  order: z.enum(["subscriptionOrderUnspecified", "relevance", "unread", "alphabetical"]).optional().describe("The order of the returned subscriptions"),
  pageToken: z.string().optional().describe("The *pageToken* parameter identifies a specific page in the result set that should be returned. In an API response, the nextPageToken and prevPageToken properties identify other pages that could be retrieved."),
})

export const YoutubeSubscriptionsListOutput = z.object({
  etag: z.string().optional().describe("Etag of this resource."),
  eventId: z.string().optional().describe("Serialized EventId of the request which produced this response."),
  items: z.array(z.object({
    contentDetails: z.object({
      activityType: z.enum(["subscriptionActivityTypeUnspecified", "all", "uploads"]).optional().describe("The type of activity this subscription is for (only uploads, everything)."),
      newItemCount: z.number().int().optional().describe("The number of new items in the subscription since its content was last read."),
      totalItemCount: z.number().int().optional().describe("The approximate number of items that the subscription points to."),
    }).optional().describe("The contentDetails object contains basic statistics about the subscription."),
    etag: z.string().optional().describe("Etag of this resource."),
    id: z.string().optional().describe("The ID that YouTube uses to uniquely identify the subscription."),
    kind: z.string().optional().default("youtube#subscription").describe("Identifies what kind of resource this is. Value: the fixed string \"youtube#subscription\"."),
    snippet: z.object({
      channelId: z.string().optional().describe("The ID that YouTube uses to uniquely identify the subscriber's channel."),
      channelTitle: z.string().optional().describe("Channel title for the channel that the subscription belongs to."),
      description: z.string().optional().describe("The subscription's details."),
      publishedAt: z.string().datetime().optional().describe("The date and time that the subscription was created."),
      resourceId: z.object({
        channelId: z.string().optional().describe("The ID that YouTube uses to uniquely identify the referred resource, if that resource is a channel. This property is only present if the resourceId.kind value is youtube#channel."),
        kind: z.string().optional().describe("The type of the API resource."),
        playlistId: z.string().optional().describe("The ID that YouTube uses to uniquely identify the referred resource, if that resource is a playlist. This property is only present if the resourceId.kind value is youtube#playlist."),
        videoId: z.string().optional().describe("The ID that YouTube uses to uniquely identify the referred resource, if that resource is a video. This property is only present if the resourceId.kind value is youtube#video."),
      }).optional().describe("The id object contains information about the channel that the user subscribed to."),
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
      }).optional().describe("A map of thumbnail images associated with the video. For each object in the map, the key is the name of the thumbnail image, and the value is an object that contains other information about the thumbnail."),
      title: z.string().optional().describe("The subscription's title."),
    }).optional().describe("The snippet object contains basic details about the subscription, including its title and the channel that the user subscribed to."),
    subscriberSnippet: z.object({
      channelId: z.string().optional().describe("The channel ID of the subscriber."),
      description: z.string().optional().describe("The description of the subscriber."),
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
      }).optional().describe("Thumbnails for this subscriber."),
      title: z.string().optional().describe("The title of the subscriber."),
    }).optional().describe("The subscriberSnippet object contains basic details about the subscriber."),
  })).optional().describe("A list of subscriptions that match the request criteria."),
  kind: z.string().optional().default("youtube#subscriptionListResponse").describe("Identifies what kind of resource this is. Value: the fixed string \"youtube#subscriptionListResponse\"."),
  nextPageToken: z.string().optional().describe("The token that can be used as the value of the pageToken parameter to retrieve the next page in the result set."),
  pageInfo: z.object({
    resultsPerPage: z.number().int().optional().describe("The number of results included in the API response."),
    totalResults: z.number().int().optional().describe("The total number of results in the result set."),
  }).optional().describe("Paging details for lists of resources, including total number of items available and number of resources returned in a single page."),
  prevPageToken: z.string().optional().describe("The token that can be used as the value of the pageToken parameter to retrieve the previous page in the result set."),
  tokenPagination: z.record(z.string(), z.unknown()).optional().describe("Stub token pagination template to suppress results."),
  visitorId: z.string().optional().describe("The visitorId identifies the visitor."),
})

export const youtubeSubscriptionsList = pikkuSessionlessFunc({
  description: "Retrieves a list of resources, possibly filtered.",
  input: YoutubeSubscriptionsListInput,
  output: YoutubeSubscriptionsListOutput,
  func: async ({ youtube }, data) => {
    return youtube.call("GET", "/youtube/v3/subscriptions", data) as any
  },
})
