import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { UnauthorizedError, ForbiddenError, TooManyRequestsError } from '@pikku/core/errors'

export const StartAUsersPlaybackInput = z.object({
  device_id: z.string().optional().describe("The id of the device this command is targeting. If not supplied, the user's currently active device is the target."),
  context_uri: z.string().optional().describe("Optional. Spotify URI of the context to play.\nValid contexts are albums, artists & playlists.\n`{context_uri:\"spotify:album:1Je1IMUlBXcx1Fz0WE7oPT\"}`\n"),
  offset: z.record(z.string(), z.unknown()).optional().describe("Optional. Indicates from where in the context playback should start. Only available when context_uri corresponds to an album or playlist object\n\"position\" is zero based and can’t be negative. Example: `\"offset\": {\"position\": 5}`\n\"uri\" is a string representing the uri of the item to start at. Example: `\"offset\": {\"uri\": \"spotify:track:1301WleyT98MSxVHPZCA6M\"}`\n"),
  position_ms: z.number().int().optional().describe("Indicates from what position to start playback. Must be a positive number. Passing in a position that is greater than the length of the track will cause the player to start playing the next song.\n"),
  uris: z.array(z.string()).optional().describe("Optional. A JSON array of the Spotify track URIs to play.\nFor example: `{\"uris\": [\"spotify:track:4iV5W9uYEdYUVa79Axb7Rh\", \"spotify:track:1301WleyT98MSxVHPZCA6M\"]}`\n"),
})

export const startAUsersPlayback = pikkuSessionlessFunc({
  description: "Start a new context or resume current playback on the user's active device.",
  input: StartAUsersPlaybackInput,
  errors: [UnauthorizedError, ForbiddenError, TooManyRequestsError],
  func: async ({ spotify }, data) => {
    return spotify.call("PUT", "/me/player/play", data)
  },
})
