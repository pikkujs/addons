import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnauthorizedError, ForbiddenError, TooManyRequestsError } from '@pikku/core/errors'

export const PauseAUsersPlaybackInput = z.object({
  device_id: z.string().optional().describe("The id of the device this command is targeting. If not supplied, the user's currently active device is the target.\n"),
})

export const pauseAUsersPlayback = pikkuSessionlessFunc({
  description: "Pause playback on the user's account.",
  input: PauseAUsersPlaybackInput,
  errors: [UnauthorizedError, ForbiddenError, TooManyRequestsError],
  func: async ({ spotify }, data) => {
    return spotify.call("PUT", "/me/player/pause", data)
  },
})
