import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnauthorizedError, ForbiddenError, TooManyRequestsError } from '@pikku/core/errors'

export const GetAShowsEpisodesInput = z.object({
  id: z.string().describe("The [Spotify ID](/documentation/web-api/#spotify-uris-and-ids)\nfor the show.\n"),
  market: z.string().optional().describe("An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/se/account/overview/).\n"),
  limit: z.number().int().min(1).max(50).optional().default(20).describe("The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n"),
  offset: z.number().int().optional().default(0).describe("The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n"),
})

export const GetAShowsEpisodesOutput = z.object({
  href: z.string().describe("A link to the Web API endpoint returning the full result of the request\n"),
  limit: z.number().int().describe("The maximum number of items in the response (as set in the query or by default).\n"),
  next: z.string().nullable().describe("URL to the next page of items. ( `null` if none)\n"),
  offset: z.number().int().describe("The offset of the items returned (as set in the query or by default)\n"),
  previous: z.string().nullable().describe("URL to the previous page of items. ( `null` if none)\n"),
  total: z.number().int().describe("The total number of items available to return.\n"),
  items: z.array(z.object({
    audio_preview_url: z.string().describe("A URL to a 30 second preview (MP3 format) of the episode. `null` if not available.\n"),
    description: z.string().describe("A description of the episode. HTML tags are stripped away from this field, use `html_description` field in case HTML tags are needed.\n"),
    duration_ms: z.number().int().describe("The episode length in milliseconds.\n"),
    explicit: z.boolean().describe("Whether or not the episode has explicit content (true = yes it does; false = no it does not OR unknown).\n"),
    external_urls: z.object({
      spotify: z.string().optional().describe("The [Spotify URL](/documentation/web-api/#spotify-uris-and-ids) for the object.\n"),
    }).describe("External URLs for this episode.\n"),
    href: z.string().describe("A link to the Web API endpoint providing full details of the episode.\n"),
    html_description: z.string().describe("A description of the episode. This field may contain HTML tags.\n"),
    id: z.string().describe("The [Spotify ID](/documentation/web-api/#spotify-uris-and-ids) for the episode.\n"),
    images: z.array(z.object({
      height: z.number().int().nullable().describe("The image height in pixels.\n"),
      url: z.string().describe("The source URL of the image.\n"),
      width: z.number().int().nullable().describe("The image width in pixels.\n"),
    })).describe("The cover art for the episode in various sizes, widest first.\n"),
    is_externally_hosted: z.boolean().describe("True if the episode is hosted outside of Spotify's CDN.\n"),
    is_playable: z.boolean().describe("True if the episode is playable in the given market. Otherwise false.\n"),
    language: z.string().optional().describe("The language used in the episode, identified by a [ISO 639](https://en.wikipedia.org/wiki/ISO_639) code. This field is deprecated and might be removed in the future. Please use the `languages` field instead.\n"),
    languages: z.array(z.string()).describe("A list of the languages used in the episode, identified by their [ISO 639-1](https://en.wikipedia.org/wiki/ISO_639) code.\n"),
    name: z.string().describe("The name of the episode.\n"),
    release_date: z.string().describe("The date the episode was first released, for example `\"1981-12-15\"`. Depending on the precision, it might be shown as `\"1981\"` or `\"1981-12\"`.\n"),
    release_date_precision: z.enum(["year", "month", "day"]).describe("The precision with which `release_date` value is known.\n"),
    restrictions: z.object({
      reason: z.string().optional().describe("The reason for the restriction. Supported values:\n- `market` - The content item is not available in the given market.\n- `product` - The content item is not available for the user's subscription type.\n- `explicit` - The content item is explicit and the user's account is set to not play explicit content.\n\nAdditional reasons may be added in the future.\n**Note**: If you use this field, make sure that your application safely handles unknown values.\n"),
    }).optional().describe("Included in the response when a content restriction is applied.\n"),
    resume_point: z.object({
      fully_played: z.boolean().optional().describe("Whether or not the episode has been fully played by the user.\n"),
      resume_position_ms: z.number().int().optional().describe("The user's most recent position in the episode in milliseconds.\n"),
    }).describe("The user's most recent position in the episode. Set if the supplied access token is a user token and has the scope 'user-read-playback-position'.\n"),
    type: z.literal("episode").describe("The object type.\n"),
    uri: z.string().describe("The [Spotify URI](/documentation/web-api/#spotify-uris-and-ids) for the episode.\n"),
  })),
})

export const getAShowsEpisodes = pikkuSessionlessFunc({
  description: "Get Spotify catalog information about an show’s episodes. Optional parameters can be used to limit the number of episodes returned.",
  input: GetAShowsEpisodesInput,
  output: GetAShowsEpisodesOutput,
  errors: [UnauthorizedError, ForbiddenError, TooManyRequestsError],
  func: async ({ spotify }, data) => {
    return spotify.call("GET", "/shows/{id}/episodes", data) as any
  },
})
