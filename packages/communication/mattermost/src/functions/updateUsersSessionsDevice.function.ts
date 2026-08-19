// users — Endpoints for creating, getting and interacting with users. When using endpoints that require a user id, the string `me` can be used in place of the user id to indicate the action is to be taken for the logged in user.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError } from '@pikku/core/errors'

export const UpdateUsersSessionsDeviceInput = z.object({
  device_id: z.string().describe("Mobile device id. For Android prefix the id with `android:` and Apple with `apple:`"),
})

export const UpdateUsersSessionsDeviceOutput = z.object({
  status: z.string().optional().describe("Will contain \"ok\" if the request was successful and there was nothing else to return"),
})

export const updateUsersSessionsDevice = pikkuSessionlessFunc({
  description: "Attach a mobile device id to the currently logged in session. This will enable push notifications for a user, if configured by the server.\n##### Permissions\nMust be authenticated.",
  input: UpdateUsersSessionsDeviceInput,
  output: UpdateUsersSessionsDeviceOutput,
  errors: [BadRequestError, UnauthorizedError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("PUT", "/users/sessions/device", data) as any
  },
})
