import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnauthorizedError, ForbiddenError, TooManyRequestsError } from '@pikku/core/errors'

export const AddToQueueInput = z.object({
  uri: z.string().describe("The uri of the item to add to the queue. Must be a track or an episode uri.\n"),
  device_id: z.string().optional().describe("The id of the device this command is targeting. If\nnot supplied, the user's currently active device is the target.\n"),
})

export const addToQueue = pikkuSessionlessFunc({
  description: "Add an item to the end of the user's current playback queue.",
  input: AddToQueueInput,
  errors: [UnauthorizedError, ForbiddenError, TooManyRequestsError],
  func: async ({ spotify }, data) => {
    return spotify.call("POST", "/me/player/queue", data)
  },
})
