import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const YoutubeThirdPartyLinksDeleteInput = z.object({
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
  linkingToken: z.string().describe("Delete the partner links with the given linking token."),
  type: z.enum(["linkUnspecified", "channelToStoreLink"]).describe("Type of the link to be deleted."),
  externalChannelId: z.string().optional().describe("Channel ID to which changes should be applied, for delegation."),
  part: z.array(z.string()).optional().describe("Do not use. Required for compatibility."),
})

export const youtubeThirdPartyLinksDelete = pikkuSessionlessFunc({
  description: "Deletes a resource.",
  input: YoutubeThirdPartyLinksDeleteInput,
  func: async ({ youtube }, data) => {
    return youtube.call("DELETE", "/youtube/v3/thirdPartyLinks", data)
  },
})
