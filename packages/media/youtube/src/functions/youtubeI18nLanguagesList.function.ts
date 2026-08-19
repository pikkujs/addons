import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const YoutubeI18nLanguagesListInput = z.object({
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
  part: z.array(z.string()).describe("The *part* parameter specifies the i18nLanguage resource properties that the API response will include. Set the parameter value to snippet."),
  hl: z.string().optional(),
})

export const YoutubeI18nLanguagesListOutput = z.object({
  etag: z.string().optional().describe("Etag of this resource."),
  eventId: z.string().optional().describe("Serialized EventId of the request which produced this response."),
  items: z.array(z.object({
    etag: z.string().optional().describe("Etag of this resource."),
    id: z.string().optional().describe("The ID that YouTube uses to uniquely identify the i18n language."),
    kind: z.string().optional().default("youtube#i18nLanguage").describe("Identifies what kind of resource this is. Value: the fixed string \"youtube#i18nLanguage\"."),
    snippet: z.object({
      hl: z.string().optional().describe("A short BCP-47 code that uniquely identifies a language."),
      name: z.string().optional().describe("The human-readable name of the language in the language itself."),
    }).optional().describe("The snippet object contains basic details about the i18n language, such as language code and human-readable name."),
  })).optional().describe("A list of supported i18n languages. In this map, the i18n language ID is the map key, and its value is the corresponding i18nLanguage resource."),
  kind: z.string().optional().default("youtube#i18nLanguageListResponse").describe("Identifies what kind of resource this is. Value: the fixed string \"youtube#i18nLanguageListResponse\"."),
  visitorId: z.string().optional().describe("The visitorId identifies the visitor."),
})

export const youtubeI18nLanguagesList = pikkuSessionlessFunc({
  description: "Retrieves a list of resources, possibly filtered.",
  input: YoutubeI18nLanguagesListInput,
  output: YoutubeI18nLanguagesListOutput,
  func: async ({ youtube }, data) => {
    return youtube.call("GET", "/youtube/v3/i18nLanguages", data) as any
  },
})
