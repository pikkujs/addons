import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { UnauthorizedError, ForbiddenError, TooManyRequestsError } from '@pikku/core/errors'

export const ReorderOrReplacePlaylistsTracksInput = z.object({
  playlist_id: z.string().describe("The [Spotify ID](/documentation/web-api/#spotify-uris-and-ids) of the playlist.\n"),
  uris: z.string().optional().describe("A comma-separated list of [Spotify URIs](/documentation/web-api/#spotify-uris-and-ids) to set, can be track or episode URIs. For example: `uris=spotify:track:4iV5W9uYEdYUVa79Axb7Rh,spotify:track:1301WleyT98MSxVHPZCA6M,spotify:episode:512ojhOuo1ktJprKbVcKyQ`<br/>A maximum of 100 items can be set in one request.\n"),
  insert_before: z.number().int().optional().describe("The position where the items should be inserted.<br/>To reorder the items to the end of the playlist, simply set _insert_before_ to the position after the last item.<br/>Examples:<br/>To reorder the first item to the last position in a playlist with 10 items, set _range_start_ to 0, and _insert_before_ to 10.<br/>To reorder the last item in a playlist with 10 items to the start of the playlist, set _range_start_ to 9, and _insert_before_ to 0.\n"),
  range_length: z.number().int().optional().describe("The amount of items to be reordered. Defaults to 1 if not set.<br/>The range of items to be reordered begins from the _range_start_ position, and includes the _range_length_ subsequent items.<br/>Example:<br/>To move the items at index 9-10 to the start of the playlist, _range_start_ is set to 9, and _range_length_ is set to 2.\n"),
  range_start: z.number().int().optional().describe("The position of the first item to be reordered.\n"),
  snapshot_id: z.string().optional().describe("The playlist's snapshot ID against which you want to make the changes.\n"),
})

export const ReorderOrReplacePlaylistsTracksOutput = z.object({
  snapshot_id: z.string().optional(),
})

export const reorderOrReplacePlaylistsTracks = pikkuSessionlessFunc({
  description: "Either reorder or replace items in a playlist depending on the request's parameters.\nTo reorder items, include `range_start`, `insert_before`, `range_length` and `snapshot_id` in the request's body.\nTo replace items, include `uris` as either a query parameter or in the request's body.\nReplacing items in a playlist will overwrite its existing items. This operation can be used for replacing or clearing items in a playlist.\n<br/>\n**Note**: Replace and reorder are mutually exclusive operations which share the same endpoint, but have different parameters.\nThese operations can't be applied together in a single request.",
  input: ReorderOrReplacePlaylistsTracksInput,
  output: ReorderOrReplacePlaylistsTracksOutput,
  errors: [UnauthorizedError, ForbiddenError, TooManyRequestsError],
  func: async ({ spotify }, data) => {
    return spotify.call("PUT", "/playlists/{playlist_id}/tracks", data) as any
  },
})
