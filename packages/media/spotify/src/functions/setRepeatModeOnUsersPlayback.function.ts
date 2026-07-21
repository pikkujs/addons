import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnauthorizedError, ForbiddenError, TooManyRequestsError } from '@pikku/core/errors'

export const SetRepeatModeOnUsersPlaybackInput = z.object({
  state: z.string().describe("**track**, **context** or **off**.<br/>\n**track** will repeat the current track.<br/>\n**context** will repeat the current context.<br/>\n**off** will turn repeat off.\n"),
  device_id: z.string().optional().describe("The id of the device this command is targeting. If\nnot supplied, the user's currently active device is the target.\n"),
})

export const setRepeatModeOnUsersPlayback = pikkuSessionlessFunc({
  description: "Set the repeat mode for the user's playback. Options are repeat-track,\nrepeat-context, and off.",
  input: SetRepeatModeOnUsersPlaybackInput,
  errors: [UnauthorizedError, ForbiddenError, TooManyRequestsError],
  func: async ({ spotify }, data) => {
    return spotify.call("PUT", "/me/player/repeat", data)
  },
})
