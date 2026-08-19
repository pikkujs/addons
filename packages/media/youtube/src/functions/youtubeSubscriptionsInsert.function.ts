import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const YoutubeSubscriptionsInsertInput = z.object({
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
  part: z.array(z.string()).describe("The *part* parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response will include."),
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
})

export const YoutubeSubscriptionsInsertOutput = z.object({
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
}).describe("A *subscription* resource contains information about a YouTube user subscription. A subscription notifies a user when new videos are added to a channel or when another user takes one of several actions on YouTube, such as uploading a video, rating a video, or commenting on a video.")

export const youtubeSubscriptionsInsert = pikkuSessionlessFunc({
  description: "Inserts a new resource into this collection.",
  input: YoutubeSubscriptionsInsertInput,
  output: YoutubeSubscriptionsInsertOutput,
  func: async ({ youtube }, data) => {
    return youtube.call("POST", "/youtube/v3/subscriptions", data) as any
  },
})
