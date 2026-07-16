import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnauthorizedError, ForbiddenError, TooManyRequestsError } from '@pikku/core/errors'

export const GetMultipleShowsInput = z.object({
  market: z.string().optional().describe("An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/se/account/overview/).\n"),
  ids: z.string().describe("A comma-separated list of the [Spotify IDs](/documentation/web-api/#spotify-uris-and-ids) for the shows. Maximum: 50 IDs.\n"),
})

export const GetMultipleShowsOutput = z.object({
  shows: z.array(z.object({
    available_markets: z.array(z.string()).describe("A list of the countries in which the show can be played, identified by their [ISO 3166-1 alpha-2](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) code.\n"),
    copyrights: z.array(z.object({
      text: z.string().optional().describe("The copyright text for this content.\n"),
      type: z.string().optional().describe("The type of copyright: `C` = the copyright, `P` = the sound recording (performance) copyright.\n"),
    })).describe("The copyright statements of the show.\n"),
    description: z.string().describe("A description of the show. HTML tags are stripped away from this field, use `html_description` field in case HTML tags are needed.\n"),
    explicit: z.boolean().describe("Whether or not the show has explicit content (true = yes it does; false = no it does not OR unknown).\n"),
    external_urls: z.object({
      spotify: z.string().optional().describe("The [Spotify URL](/documentation/web-api/#spotify-uris-and-ids) for the object.\n"),
    }).describe("External URLs for this show.\n"),
    href: z.string().describe("A link to the Web API endpoint providing full details of the show.\n"),
    html_description: z.string().describe("A description of the show. This field may contain HTML tags.\n"),
    id: z.string().describe("The [Spotify ID](/documentation/web-api/#spotify-uris-and-ids) for the show.\n"),
    images: z.array(z.object({
      height: z.number().int().nullable().describe("The image height in pixels.\n"),
      url: z.string().describe("The source URL of the image.\n"),
      width: z.number().int().nullable().describe("The image width in pixels.\n"),
    })).describe("The cover art for the show in various sizes, widest first.\n"),
    is_externally_hosted: z.boolean().describe("True if all of the shows episodes are hosted outside of Spotify's CDN. This field might be `null` in some cases.\n"),
    languages: z.array(z.string()).describe("A list of the languages used in the show, identified by their [ISO 639](https://en.wikipedia.org/wiki/ISO_639) code.\n"),
    media_type: z.string().describe("The media type of the show.\n"),
    name: z.string().describe("The name of the episode.\n"),
    publisher: z.string().describe("The publisher of the show.\n"),
    total_episodes: z.number().int().describe("The total number of episodes in the show.\n"),
    type: z.literal("show").describe("The object type.\n"),
    uri: z.string().describe("The [Spotify URI](/documentation/web-api/#spotify-uris-and-ids) for the show.\n"),
  })),
})

export const getMultipleShows = pikkuSessionlessFunc({
  description: "Get Spotify catalog information for several shows based on their Spotify IDs.",
  input: GetMultipleShowsInput,
  output: GetMultipleShowsOutput,
  errors: [UnauthorizedError, ForbiddenError, TooManyRequestsError],
  func: async ({ spotify }, data) => {
    return spotify.call("GET", "/shows", data) as any
  },
})
