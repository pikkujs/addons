import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnauthorizedError, ForbiddenError, TooManyRequestsError } from '@pikku/core/errors'

export const SetVolumeForUsersPlaybackInput = z.object({
  volume_percent: z.number().int().describe("The volume to set. Must be a value from 0 to 100 inclusive.\n"),
  device_id: z.string().optional().describe("The id of the device this command is targeting. If not supplied, the user's currently active device is the target.\n"),
})

export const setVolumeForUsersPlayback = pikkuSessionlessFunc({
  description: "Set the volume for the user’s current playback device.",
  input: SetVolumeForUsersPlaybackInput,
  errors: [UnauthorizedError, ForbiddenError, TooManyRequestsError],
  func: async ({ spotify }, data) => {
    return spotify.call("PUT", "/me/player/volume", data)
  },
})
