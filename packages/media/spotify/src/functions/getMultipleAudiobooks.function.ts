import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnauthorizedError, ForbiddenError, TooManyRequestsError } from '@pikku/core/errors'

export const GetMultipleAudiobooksInput = z.object({
  ids: z.string().describe("A comma-separated list of the [Spotify IDs](/documentation/web-api/#spotify-uris-and-ids). For example: `ids=18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ`. Maximum: 50 IDs.\n"),
  market: z.string().optional().describe("An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/se/account/overview/).\n"),
})

export const GetMultipleAudiobooksOutput = z.object({
  audiobooks: z.array(z.object({
    authors: z.array(z.object({
      name: z.string().optional().describe("The name of the author.\n"),
    })).describe("The author(s) for the audiobook.\n"),
    available_markets: z.array(z.string()).describe("A list of the countries in which the audiobook can be played, identified by their [ISO 3166-1 alpha-2](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) code.\n"),
    copyrights: z.array(z.object({
      text: z.string().optional().describe("The copyright text for this content.\n"),
      type: z.string().optional().describe("The type of copyright: `C` = the copyright, `P` = the sound recording (performance) copyright.\n"),
    })).describe("The copyright statements of the audiobook.\n"),
    description: z.string().describe("A description of the audiobook. HTML tags are stripped away from this field, use `html_description` field in case HTML tags are needed.\n"),
    edition: z.string().optional().describe("The edition of the audiobook.\n"),
    explicit: z.boolean().describe("Whether or not the audiobook has explicit content (true = yes it does; false = no it does not OR unknown).\n"),
    external_urls: z.object({
      spotify: z.string().optional().describe("The [Spotify URL](/documentation/web-api/#spotify-uris-and-ids) for the object.\n"),
    }).describe("External URLs for this audiobook.\n"),
    href: z.string().describe("A link to the Web API endpoint providing full details of the audiobook.\n"),
    html_description: z.string().describe("A description of the audiobook. This field may contain HTML tags.\n"),
    id: z.string().describe("The [Spotify ID](/documentation/web-api/#spotify-uris-and-ids) for the audiobook.\n"),
    images: z.array(z.object({
      height: z.number().int().nullable().describe("The image height in pixels.\n"),
      url: z.string().describe("The source URL of the image.\n"),
      width: z.number().int().nullable().describe("The image width in pixels.\n"),
    })).describe("The cover art for the audiobook in various sizes, widest first.\n"),
    languages: z.array(z.string()).describe("A list of the languages used in the audiobook, identified by their [ISO 639](https://en.wikipedia.org/wiki/ISO_639) code.\n"),
    media_type: z.string().describe("The media type of the audiobook.\n"),
    name: z.string().describe("The name of the audiobook.\n"),
    narrators: z.array(z.object({
      name: z.string().optional().describe("The name of the Narrator.\n"),
    })).describe("The narrator(s) for the audiobook.\n"),
    publisher: z.string().describe("The publisher of the audiobook.\n"),
    total_chapters: z.number().int().describe("The number of chapters in this audiobook.\n"),
    type: z.literal("audiobook").describe("The object type.\n"),
    uri: z.string().describe("The [Spotify URI](/documentation/web-api/#spotify-uris-and-ids) for the audiobook.\n"),
    chapters: z.unknown().describe("The chapters of the audiobook.\n"),
  })),
})

export const getMultipleAudiobooks = pikkuSessionlessFunc({
  description: "Get Spotify catalog information for several audiobooks identified by their Spotify IDs.<br />\n**Note: Audiobooks are only available for the US, UK, Ireland, New Zealand and Australia markets.**",
  input: GetMultipleAudiobooksInput,
  output: GetMultipleAudiobooksOutput,
  errors: [UnauthorizedError, ForbiddenError, TooManyRequestsError],
  func: async ({ spotify }, data) => {
    return spotify.call("GET", "/audiobooks", data) as any
  },
})
