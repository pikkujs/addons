import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { UnauthorizedError, ForbiddenError, TooManyRequestsError } from '@pikku/core/errors'

export const ChangePlaylistDetailsInput = z.object({
  playlist_id: z.string().describe("The [Spotify ID](/documentation/web-api/#spotify-uris-and-ids) of the playlist.\n"),
  collaborative: z.boolean().optional().describe("If `true`, the playlist will become collaborative and other users will be able to modify the playlist in their Spotify client. <br/>\n_**Note**: You can only set `collaborative` to `true` on non-public playlists._\n"),
  description: z.string().optional().describe("Value for playlist description as displayed in Spotify Clients and in the Web API.\n"),
  name: z.string().optional().describe("The new name for the playlist, for example `\"My New Playlist Title\"`\n"),
  public: z.boolean().optional().describe("If `true` the playlist will be public, if `false` it will be private.\n"),
})

export const changePlaylistDetails = pikkuSessionlessFunc({
  description: "Change a playlist's name and public/private state. (The user must, of\ncourse, own the playlist.)",
  input: ChangePlaylistDetailsInput,
  errors: [UnauthorizedError, ForbiddenError, TooManyRequestsError],
  func: async ({ spotify }, data) => {
    return spotify.call("PUT", "/playlists/{playlist_id}", data)
  },
})
