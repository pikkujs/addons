import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const YoutubeThirdPartyLinksUpdateInput = z.object({
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
  part: z.array(z.string()).describe("The *part* parameter specifies the thirdPartyLink resource parts that the API request and response will include. Supported values are linkingToken, status, and snippet."),
  externalChannelId: z.string().optional().describe("Channel ID to which changes should be applied, for delegation."),
  etag: z.string().optional().describe("Etag of this resource"),
  kind: z.string().optional().default("youtube#thirdPartyLink").describe("Identifies what kind of resource this is. Value: the fixed string \"youtube#thirdPartyLink\"."),
  linkingToken: z.string().optional().describe("The linking_token identifies a YouTube account and channel with which the third party account is linked."),
  snippet: z.object({
  channelToStoreLink: z.object({
    merchantId: z.string().optional().describe("Google Merchant Center id of the store."),
    storeName: z.string().optional().describe("Name of the store."),
    storeUrl: z.string().optional().describe("Landing page of the store."),
  }).optional().describe("Information specific to a link between a channel and a store on a merchandising platform."),
  type: z.enum(["linkUnspecified", "channelToStoreLink"]).optional().describe("Type of the link named after the entities that are being linked."),
}).optional().describe("The snippet object contains basic details about the third- party account link."),
  status: z.object({
  linkStatus: z.enum(["unknown", "failed", "pending", "linked"]).optional(),
}).optional().describe("The status object contains information about the status of the link."),
})

export const YoutubeThirdPartyLinksUpdateOutput = z.object({
  etag: z.string().optional().describe("Etag of this resource"),
  kind: z.string().optional().default("youtube#thirdPartyLink").describe("Identifies what kind of resource this is. Value: the fixed string \"youtube#thirdPartyLink\"."),
  linkingToken: z.string().optional().describe("The linking_token identifies a YouTube account and channel with which the third party account is linked."),
  snippet: z.object({
    channelToStoreLink: z.object({
      merchantId: z.string().optional().describe("Google Merchant Center id of the store."),
      storeName: z.string().optional().describe("Name of the store."),
      storeUrl: z.string().optional().describe("Landing page of the store."),
    }).optional().describe("Information specific to a link between a channel and a store on a merchandising platform."),
    type: z.enum(["linkUnspecified", "channelToStoreLink"]).optional().describe("Type of the link named after the entities that are being linked."),
  }).optional().describe("The snippet object contains basic details about the third- party account link."),
  status: z.object({
    linkStatus: z.enum(["unknown", "failed", "pending", "linked"]).optional(),
  }).optional().describe("The status object contains information about the status of the link."),
}).describe("A *third party account link* resource represents a link between a YouTube account or a channel and an account on a third-party service.")

export const youtubeThirdPartyLinksUpdate = pikkuSessionlessFunc({
  description: "Updates an existing resource.",
  input: YoutubeThirdPartyLinksUpdateInput,
  output: YoutubeThirdPartyLinksUpdateOutput,
  func: async ({ youtube }, data) => {
    return youtube.call("PUT", "/youtube/v3/thirdPartyLinks", data) as any
  },
})
