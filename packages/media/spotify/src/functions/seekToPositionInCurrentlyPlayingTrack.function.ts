import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { UnauthorizedError, ForbiddenError, TooManyRequestsError } from '@pikku/core/errors'

export const SeekToPositionInCurrentlyPlayingTrackInput = z.object({
  position_ms: z.number().int().describe("The position in milliseconds to seek to. Must be a\npositive number. Passing in a position that is greater than the length of\nthe track will cause the player to start playing the next song.\n"),
  device_id: z.string().optional().describe("The id of the device this command is targeting. If\nnot supplied, the user's currently active device is the target.\n"),
})

export const seekToPositionInCurrentlyPlayingTrack = pikkuSessionlessFunc({
  description: "Seeks to the given position in the user’s currently playing track.",
  input: SeekToPositionInCurrentlyPlayingTrackInput,
  errors: [UnauthorizedError, ForbiddenError, TooManyRequestsError],
  func: async ({ spotify }, data) => {
    return spotify.call("PUT", "/me/player/seek", data)
  },
})
