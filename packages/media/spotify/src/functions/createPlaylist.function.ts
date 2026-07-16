import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnauthorizedError, ForbiddenError, TooManyRequestsError } from '@pikku/core/errors'

export const CreatePlaylistInput = z.object({
  user_id: z.string().describe("The user's [Spotify user ID](/documentation/web-api/#spotify-uris-and-ids).\n"),
  collaborative: z.boolean().optional().describe("Defaults to `false`. If `true` the playlist will be collaborative. _**Note**: to create a collaborative playlist you must also set `public` to `false`. To create collaborative playlists you must have granted `playlist-modify-private` and `playlist-modify-public` [scopes](/documentation/general/guides/authorization-guide/#list-of-scopes)._\n"),
  description: z.string().optional().describe("value for playlist description as displayed in Spotify Clients and in the Web API.\n"),
  name: z.string().describe("The name for the new playlist, for example `\"Your Coolest Playlist\"`. This name does not need to be unique; a user may have several playlists with the same name.\n"),
  public: z.boolean().optional().describe("Defaults to `true`. If `true` the playlist will be public, if `false` it will be private. To be able to create private playlists, the user must have granted the `playlist-modify-private` [scope](/documentation/general/guides/authorization-guide/#list-of-scopes)\n"),
})

export const CreatePlaylistOutput = z.object({
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

export const createPlaylist = pikkuSessionlessFunc({
  description: "Create a playlist for a Spotify user. (The playlist will be empty until\nyou [add tracks](/documentation/web-api/reference/#/operations/add-tracks-to-playlist).)",
  input: CreatePlaylistInput,
  output: CreatePlaylistOutput,
  errors: [UnauthorizedError, ForbiddenError, TooManyRequestsError],
  func: async ({ spotify }, data) => {
    return spotify.call("POST", "/users/{user_id}/playlists", data) as any
  },
})
