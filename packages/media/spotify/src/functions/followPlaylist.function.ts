import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnauthorizedError, ForbiddenError, TooManyRequestsError } from '@pikku/core/errors'

export const FollowPlaylistInput = z.object({
  playlist_id: z.string().describe("The [Spotify ID](/documentation/web-api/#spotify-uris-and-ids) of the playlist.\n"),
  public: z.boolean().optional().describe("Defaults to `true`. If `true` the playlist will be included in user's public playlists, if `false` it will remain private.\n"),
})

export const followPlaylist = pikkuSessionlessFunc({
  description: "Add the current user as a follower of a playlist.",
  input: FollowPlaylistInput,
  errors: [UnauthorizedError, ForbiddenError, TooManyRequestsError],
  func: async ({ spotify }, data) => {
    return spotify.call("PUT", "/playlists/{playlist_id}/followers", data)
  },
})
