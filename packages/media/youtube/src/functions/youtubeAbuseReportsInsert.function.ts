import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const YoutubeAbuseReportsInsertInput = z.object({
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
  abuseTypes: z.array(z.object({
  id: z.string().optional(),
})).optional(),
  description: z.string().optional(),
  relatedEntities: z.array(z.object({
  entity: z.object({
    id: z.string().optional(),
    typeId: z.string().optional(),
    url: z.string().optional(),
  }).optional(),
})).optional(),
  subject: z.object({
  id: z.string().optional(),
  typeId: z.string().optional(),
  url: z.string().optional(),
}).optional(),
})

export const YoutubeAbuseReportsInsertOutput = z.object({
  abuseTypes: z.array(z.object({
    id: z.string().optional(),
  })).optional(),
  description: z.string().optional(),
  relatedEntities: z.array(z.object({
    entity: z.object({
      id: z.string().optional(),
      typeId: z.string().optional(),
      url: z.string().optional(),
    }).optional(),
  })).optional(),
  subject: z.object({
    id: z.string().optional(),
    typeId: z.string().optional(),
    url: z.string().optional(),
  }).optional(),
})

export const youtubeAbuseReportsInsert = pikkuSessionlessFunc({
  description: "Inserts a new resource into this collection.",
  input: YoutubeAbuseReportsInsertInput,
  output: YoutubeAbuseReportsInsertOutput,
  func: async ({ youtube }, data) => {
    return youtube.call("POST", "/youtube/v3/abuseReports", data) as any
  },
})
