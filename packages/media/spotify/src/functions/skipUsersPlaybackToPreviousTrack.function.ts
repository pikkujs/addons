import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { UnauthorizedError, ForbiddenError, TooManyRequestsError } from '@pikku/core/errors'

export const SkipUsersPlaybackToPreviousTrackInput = z.object({
  device_id: z.string().optional().describe("The id of the device this command is targeting. If\nnot supplied, the user's currently active device is the target.\n"),
})

export const skipUsersPlaybackToPreviousTrack = pikkuSessionlessFunc({
  description: "Skips to previous track in the user’s queue.",
  input: SkipUsersPlaybackToPreviousTrackInput,
  errors: [UnauthorizedError, ForbiddenError, TooManyRequestsError],
  func: async ({ spotify }, data) => {
    return spotify.call("POST", "/me/player/previous", data)
  },
})
