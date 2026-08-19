import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { UnauthorizedError, ForbiddenError, TooManyRequestsError } from '@pikku/core/errors'

export const CheckIfUserFollowsPlaylistInput = z.object({
  playlist_id: z.string().describe("The [Spotify ID](/documentation/web-api/#spotify-uris-and-ids) of the playlist.\n"),
  ids: z.string().describe("A comma-separated list of [Spotify User IDs](/documentation/web-api/#spotify-uris-and-ids) ; the ids of the users that you want to check to see if they follow the playlist. Maximum: 5 ids.\n"),
})

export const CheckIfUserFollowsPlaylistOutput = z.array(z.boolean())

export const checkIfUserFollowsPlaylist = pikkuSessionlessFunc({
  description: "Check to see if one or more Spotify users are following a specified playlist.",
  input: CheckIfUserFollowsPlaylistInput,
  output: CheckIfUserFollowsPlaylistOutput,
  errors: [UnauthorizedError, ForbiddenError, TooManyRequestsError],
  func: async ({ spotify }, data) => {
    return spotify.call("GET", "/playlists/{playlist_id}/followers/contains", data) as any
  },
})
