import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnauthorizedError, ForbiddenError, TooManyRequestsError } from '@pikku/core/errors'

export const AddTracksToPlaylistInput = z.object({
  playlist_id: z.string().describe("The [Spotify ID](/documentation/web-api/#spotify-uris-and-ids) of the playlist.\n"),
  position: z.number().int().optional().describe("The position to insert the items, a zero-based index. For example, to insert the items in the first position: `position=0`; to insert the items in the third position: `position=2`. If omitted, the items will be appended to the playlist. Items are added in the order they are listed in the query string or request body.\n"),
  uris: z.string().optional().describe("A comma-separated list of [Spotify URIs](/documentation/web-api/#spotify-uris-and-ids) to add, can be track or episode URIs. For example:<br/>`uris=spotify:track:4iV5W9uYEdYUVa79Axb7Rh, spotify:track:1301WleyT98MSxVHPZCA6M, spotify:episode:512ojhOuo1ktJprKbVcKyQ`<br/>A maximum of 100 items can be added in one request. <br/>\n_**Note**: it is likely that passing a large number of item URIs as a query parameter will exceed the maximum length of the request URI. When adding a large number of items, it is recommended to pass them in the request body, see below._\n"),
})

export const AddTracksToPlaylistOutput = z.object({
  snapshot_id: z.string().optional(),
})

export const addTracksToPlaylist = pikkuSessionlessFunc({
  description: "Add one or more items to a user's playlist.",
  input: AddTracksToPlaylistInput,
  output: AddTracksToPlaylistOutput,
  errors: [UnauthorizedError, ForbiddenError, TooManyRequestsError],
  func: async ({ spotify }, data) => {
    return spotify.call("POST", "/playlists/{playlist_id}/tracks", data) as any
  },
})
