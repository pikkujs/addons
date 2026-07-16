import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnauthorizedError, ForbiddenError, TooManyRequestsError } from '@pikku/core/errors'

export const UnfollowPlaylistInput = z.object({
  playlist_id: z.string().describe("The [Spotify ID](/documentation/web-api/#spotify-uris-and-ids) of the playlist.\n"),
})

export const unfollowPlaylist = pikkuSessionlessFunc({
  description: "Remove the current user as a follower of a playlist.",
  input: UnfollowPlaylistInput,
  errors: [UnauthorizedError, ForbiddenError, TooManyRequestsError],
  func: async ({ spotify }, data) => {
    return spotify.call("DELETE", "/playlists/{playlist_id}/followers", data)
  },
})
