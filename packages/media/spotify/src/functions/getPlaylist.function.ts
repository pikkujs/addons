import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { UnauthorizedError, ForbiddenError, TooManyRequestsError } from '@pikku/core/errors'

export const GetPlaylistInput = z.object({
  playlist_id: z.string().describe("The [Spotify ID](/documentation/web-api/#spotify-uris-and-ids) of the playlist.\n"),
  market: z.string().optional().describe("An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/se/account/overview/).\n"),
  fields: z.string().optional().describe("Filters for the query: a comma-separated list of the\nfields to return. If omitted, all fields are returned. For example, to get\njust the playlist''s description and URI: `fields=description,uri`. A dot\nseparator can be used to specify non-reoccurring fields, while parentheses\ncan be used to specify reoccurring fields within objects. For example, to\nget just the added date and user ID of the adder: `fields=tracks.items(added_at,added_by.id)`.\nUse multiple parentheses to drill down into nested objects, for example: `fields=tracks.items(track(name,href,album(name,href)))`.\nFields can be excluded by prefixing them with an exclamation mark, for example:\n`fields=tracks.items(track(name,href,album(!name,href)))`\n"),
  additional_types: z.string().optional().describe("A comma-separated list of item types that your client supports besides the default `track` type. Valid types are: `track` and `episode`.<br/>\n_**Note**: This parameter was introduced to allow existing clients to maintain their current behaviour and might be deprecated in the future._<br/>\nIn addition to providing this parameter, make sure that your client properly handles cases of new types in the future by checking against the `type` field of each object.\n"),
})

export const GetPlaylistOutput = z.object({
  collaborative: z.boolean().optional().describe("`true` if the owner allows other users to modify the playlist.\n"),
  description: z.string().nullable().optional().describe("The playlist description. _Only returned for modified, verified playlists, otherwise_ `null`.\n"),
  external_urls: z.object({
    spotify: z.string().optional().describe("The [Spotify URL](/documentation/web-api/#spotify-uris-and-ids) for the object.\n"),
  }).optional().describe("Known external URLs for this playlist.\n"),
  followers: z.object({
    href: z.string().nullable().optional().describe("This will always be set to null, as the Web API does not support it at the moment.\n"),
    total: z.number().int().optional().describe("The total number of followers.\n"),
  }).optional().describe("Information about the followers of the playlist."),
  href: z.string().optional().describe("A link to the Web API endpoint providing full details of the playlist.\n"),
  id: z.string().optional().describe("The [Spotify ID](/documentation/web-api/#spotify-uris-and-ids) for the playlist.\n"),
  images: z.array(z.object({
    height: z.number().int().nullable().describe("The image height in pixels.\n"),
    url: z.string().describe("The source URL of the image.\n"),
    width: z.number().int().nullable().describe("The image width in pixels.\n"),
  })).optional().describe("Images for the playlist. The array may be empty or contain up to three images. The images are returned by size in descending order. See [Working with Playlists](/documentation/general/guides/working-with-playlists/). _**Note**: If returned, the source URL for the image (`url`) is temporary and will expire in less than a day._\n"),
  name: z.string().optional().describe("The name of the playlist.\n"),
  owner: z.unknown().optional().describe("The user who owns the playlist\n"),
  public: z.boolean().optional().describe("The playlist's public/private status: `true` the playlist is public, `false` the playlist is private, `null` the playlist status is not relevant. For more about public/private status, see [Working with Playlists](/documentation/general/guides/working-with-playlists/)\n"),
  snapshot_id: z.string().optional().describe("The version identifier for the current playlist. Can be supplied in other requests to target a specific playlist version\n"),
  tracks: z.unknown().optional().describe("The tracks of the playlist.\n"),
  type: z.string().optional().describe("The object type: \"playlist\"\n"),
  uri: z.string().optional().describe("The [Spotify URI](/documentation/web-api/#spotify-uris-and-ids) for the playlist.\n"),
})

export const getPlaylist = pikkuSessionlessFunc({
  description: "Get a playlist owned by a Spotify user.",
  input: GetPlaylistInput,
  output: GetPlaylistOutput,
  errors: [UnauthorizedError, ForbiddenError, TooManyRequestsError],
  func: async ({ spotify }, data) => {
    return spotify.call("GET", "/playlists/{playlist_id}", data) as any
  },
})
