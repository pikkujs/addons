import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { UnauthorizedError, ForbiddenError, TooManyRequestsError } from '@pikku/core/errors'

export const UploadCustomPlaylistCoverInput = z.object({
  playlist_id: z.string().describe("The [Spotify ID](/documentation/web-api/#spotify-uris-and-ids) of the playlist.\n"),
  body: z.string(),
})

export const uploadCustomPlaylistCover = pikkuSessionlessFunc({
  description: "Replace the image used to represent a specific playlist.",
  input: UploadCustomPlaylistCoverInput,
  errors: [UnauthorizedError, ForbiddenError, TooManyRequestsError],
  func: async ({ spotify }, data) => {
    return spotify.call("PUT", "/playlists/{playlist_id}/images", data)
  },
})
