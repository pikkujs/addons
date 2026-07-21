import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnauthorizedError, ForbiddenError, TooManyRequestsError } from '@pikku/core/errors'

export const ToggleShuffleForUsersPlaybackInput = z.object({
  state: z.boolean().describe("**true** : Shuffle user's playback.<br/>\n**false** : Do not shuffle user's playback.\n"),
  device_id: z.string().optional().describe("The id of the device this command is targeting. If\nnot supplied, the user's currently active device is the target.\n"),
})

export const toggleShuffleForUsersPlayback = pikkuSessionlessFunc({
  description: "Toggle shuffle on or off for user’s playback.",
  input: ToggleShuffleForUsersPlaybackInput,
  errors: [UnauthorizedError, ForbiddenError, TooManyRequestsError],
  func: async ({ spotify }, data) => {
    return spotify.call("PUT", "/me/player/shuffle", data)
  },
})
