import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const YoutubeCommentsSetModerationStatusInput = z.object({
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
  id: z.array(z.string()).describe("Modifies the moderation status of the comments with the given IDs"),
  moderationStatus: z.enum(["published", "heldForReview", "likelySpam", "rejected"]).describe("Specifies the requested moderation status. Note, comments can be in statuses, which are not available through this call. For example, this call does not allow to mark a comment as 'likely spam'. Valid values: MODERATION_STATUS_PUBLISHED, MODERATION_STATUS_HELD_FOR_REVIEW, MODERATION_STATUS_REJECTED."),
  banAuthor: z.boolean().optional().describe("If set to true the author of the comment gets added to the ban list. This means all future comments of the author will autmomatically be rejected. Only valid in combination with STATUS_REJECTED."),
})

export const youtubeCommentsSetModerationStatus = pikkuSessionlessFunc({
  description: "Sets the moderation status of one or more comments.",
  input: YoutubeCommentsSetModerationStatusInput,
  func: async ({ youtube }, data) => {
    return youtube.call("POST", "/youtube/v3/comments/setModerationStatus", data)
  },
})
