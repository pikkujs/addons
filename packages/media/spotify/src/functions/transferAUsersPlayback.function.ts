import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnauthorizedError, ForbiddenError, TooManyRequestsError } from '@pikku/core/errors'

export const TransferAUsersPlaybackInput = z.object({
  device_ids: z.array(z.string()).describe("A JSON array containing the ID of the device on which playback should be started/transferred.<br/>For example:`{device_ids:[\"74ASZWbe4lXaubB36ztrGX\"]}`<br/>_**Note**: Although an array is accepted, only a single device_id is currently supported. Supplying more than one will return `400 Bad Request`_\n"),
  play: z.boolean().optional().describe("**true**: ensure playback happens on new device.<br/>**false** or not provided: keep the current playback state.\n"),
})

export const transferAUsersPlayback = pikkuSessionlessFunc({
  description: "Transfer playback to a new device and determine if it should start playing.",
  input: TransferAUsersPlaybackInput,
  errors: [UnauthorizedError, ForbiddenError, TooManyRequestsError],
  func: async ({ spotify }, data) => {
    return spotify.call("PUT", "/me/player", data)
  },
})
