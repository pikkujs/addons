import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnauthorizedError, ForbiddenError, TooManyRequestsError } from '@pikku/core/errors'

export const SkipUsersPlaybackToNextTrackInput = z.object({
  device_id: z.string().optional().describe("The id of the device this command is targeting. If not supplied, the user's currently active device is the target."),
})

export const skipUsersPlaybackToNextTrack = pikkuSessionlessFunc({
  description: "Skips to next track in the user’s queue.",
  input: SkipUsersPlaybackToNextTrackInput,
  errors: [UnauthorizedError, ForbiddenError, TooManyRequestsError],
  func: async ({ spotify }, data) => {
    return spotify.call("POST", "/me/player/next", data)
  },
})
