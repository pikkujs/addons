import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const YoutubeSuperChatEventsListInput = z.object({
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
  part: z.array(z.string()).describe("The *part* parameter specifies the superChatEvent resource parts that the API response will include. This parameter is currently not supported."),
  hl: z.string().optional().describe("Return rendered funding amounts in specified language."),
  maxResults: z.number().int().min(1).max(50).optional().describe("The *maxResults* parameter specifies the maximum number of items that should be returned in the result set."),
  pageToken: z.string().optional().describe("The *pageToken* parameter identifies a specific page in the result set that should be returned. In an API response, the nextPageToken and prevPageToken properties identify other pages that could be retrieved."),
})

export const YoutubeSuperChatEventsListOutput = z.object({
  etag: z.string().optional().describe("Etag of this resource."),
  eventId: z.string().optional().describe("Serialized EventId of the request which produced this response."),
  items: z.array(z.object({
    etag: z.string().optional().describe("Etag of this resource."),
    id: z.string().optional().describe("The ID that YouTube assigns to uniquely identify the Super Chat event."),
    kind: z.string().optional().default("youtube#superChatEvent").describe("Identifies what kind of resource this is. Value: the fixed string `\"youtube#superChatEvent\"`."),
    snippet: z.object({
      amountMicros: z.string().optional().describe("The purchase amount, in micros of the purchase currency. e.g., 1 is represented as 1000000."),
      channelId: z.string().optional().describe("Channel id where the event occurred."),
      commentText: z.string().optional().describe("The text contents of the comment left by the user."),
      createdAt: z.string().datetime().optional().describe("The date and time when the event occurred."),
      currency: z.string().optional().describe("The currency in which the purchase was made. ISO 4217."),
      displayString: z.string().optional().describe("A rendered string that displays the purchase amount and currency (e.g., \"$1.00\"). The string is rendered for the given language."),
      isSuperStickerEvent: z.boolean().optional().describe("True if this event is a Super Sticker event."),
      messageType: z.number().int().optional().describe("The tier for the paid message, which is based on the amount of money spent to purchase the message."),
      superStickerMetadata: z.object({
        altText: z.string().optional().describe("Internationalized alt text that describes the sticker image and any animation associated with it."),
        altTextLanguage: z.string().optional().describe("Specifies the localization language in which the alt text is returned."),
        stickerId: z.string().optional().describe("Unique identifier of the Super Sticker. This is a shorter form of the alt_text that includes pack name and a recognizable characteristic of the sticker."),
      }).optional().describe("If this event is a Super Sticker event, this field will contain metadata about the Super Sticker."),
      supporterDetails: z.object({
        channelId: z.string().optional().describe("The YouTube channel ID."),
        channelUrl: z.string().optional().describe("The channel's URL."),
        displayName: z.string().optional().describe("The channel's display name."),
        profileImageUrl: z.string().optional().describe("The channels's avatar URL."),
      }).optional().describe("Details about the supporter."),
    }).optional().describe("The `snippet` object contains basic details about the Super Chat event."),
  })).optional().describe("A list of Super Chat purchases that match the request criteria."),
  kind: z.string().optional().default("youtube#superChatEventListResponse").describe("Identifies what kind of resource this is. Value: the fixed string \"youtube#superChatEventListResponse\"."),
  nextPageToken: z.string().optional().describe("The token that can be used as the value of the pageToken parameter to retrieve the next page in the result set."),
  pageInfo: z.object({
    resultsPerPage: z.number().int().optional().describe("The number of results included in the API response."),
    totalResults: z.number().int().optional().describe("The total number of results in the result set."),
  }).optional().describe("Paging details for lists of resources, including total number of items available and number of resources returned in a single page."),
  tokenPagination: z.record(z.string(), z.unknown()).optional().describe("Stub token pagination template to suppress results."),
  visitorId: z.string().optional().describe("The visitorId identifies the visitor."),
})

export const youtubeSuperChatEventsList = pikkuSessionlessFunc({
  description: "Retrieves a list of resources, possibly filtered.",
  input: YoutubeSuperChatEventsListInput,
  output: YoutubeSuperChatEventsListOutput,
  func: async ({ youtube }, data) => {
    return youtube.call("GET", "/youtube/v3/superChatEvents", data) as any
  },
})
