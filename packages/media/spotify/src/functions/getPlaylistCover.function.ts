import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnauthorizedError, ForbiddenError, TooManyRequestsError } from '@pikku/core/errors'

export const GetPlaylistCoverInput = z.object({
  playlist_id: z.string().describe("The [Spotify ID](/documentation/web-api/#spotify-uris-and-ids) of the playlist.\n"),
})

export const GetPlaylistCoverOutput = z.array(z.object({
  height: z.number().int().nullable().describe("The image height in pixels.\n"),
  url: z.string().describe("The source URL of the image.\n"),
  width: z.number().int().nullable().describe("The image width in pixels.\n"),
}))

export const getPlaylistCover = pikkuSessionlessFunc({
  description: "Get the current image associated with a specific playlist.",
  input: GetPlaylistCoverInput,
  output: GetPlaylistCoverOutput,
  errors: [UnauthorizedError, ForbiddenError, TooManyRequestsError],
  func: async ({ spotify }, data) => {
    return spotify.call("GET", "/playlists/{playlist_id}/images", data) as any
  },
})
