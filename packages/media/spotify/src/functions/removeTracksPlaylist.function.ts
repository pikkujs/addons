import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { UnauthorizedError, ForbiddenError, TooManyRequestsError } from '@pikku/core/errors'

export const RemoveTracksPlaylistInput = z.object({
  playlist_id: z.string().describe("The [Spotify ID](/documentation/web-api/#spotify-uris-and-ids) of the playlist.\n"),
  snapshot_id: z.string().optional().describe("The playlist's snapshot ID against which you want to make the changes.\nThe API will validate that the specified items exist and in the specified positions and make the changes,\neven if more recent changes have been made to the playlist.\n"),
  tracks: z.array(z.object({
  uri: z.string().optional().describe("Spotify URI"),
})).describe("An array of objects containing [Spotify URIs](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) of the tracks or episodes to remove.\nFor example: `{ \"tracks\": [{ \"uri\": \"spotify:track:4iV5W9uYEdYUVa79Axb7Rh\" },{ \"uri\": \"spotify:track:1301WleyT98MSxVHPZCA6M\" }] }`. A maximum of 100 objects can be sent at once.\n"),
})

export const RemoveTracksPlaylistOutput = z.object({
  snapshot_id: z.string().optional(),
})

export const removeTracksPlaylist = pikkuSessionlessFunc({
  description: "Remove one or more items from a user's playlist.",
  input: RemoveTracksPlaylistInput,
  output: RemoveTracksPlaylistOutput,
  errors: [UnauthorizedError, ForbiddenError, TooManyRequestsError],
  func: async ({ spotify }, data) => {
    return spotify.call("DELETE", "/playlists/{playlist_id}/tracks", data) as any
  },
})
