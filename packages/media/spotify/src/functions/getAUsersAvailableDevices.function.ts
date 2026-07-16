import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnauthorizedError, ForbiddenError, TooManyRequestsError } from '@pikku/core/errors'

export const GetAUsersAvailableDevicesOutput = z.object({
  devices: z.array(z.object({
    id: z.string().nullable().optional().describe("The device ID."),
    is_active: z.boolean().optional().describe("If this device is the currently active device."),
    is_private_session: z.boolean().optional().describe("If this device is currently in a private session."),
    is_restricted: z.boolean().optional().describe("Whether controlling this device is restricted. At present if this is \"true\" then no Web API commands will be accepted by this device."),
    name: z.string().optional().describe("A human-readable name for the device. Some devices have a name that the user can configure (e.g. \\\"Loudest speaker\\\") and some devices have a generic name associated with the manufacturer or device model."),
    type: z.string().optional().describe("Device type, such as \"computer\", \"smartphone\" or \"speaker\"."),
    volume_percent: z.number().int().min(0).max(100).nullable().optional().describe("The current volume in percent."),
  })).optional().describe("A list of 0..n Device objects"),
})

export const getAUsersAvailableDevices = pikkuSessionlessFunc({
  description: "Get information about a user’s available devices.",
  output: GetAUsersAvailableDevicesOutput,
  errors: [UnauthorizedError, ForbiddenError, TooManyRequestsError],
  func: async ({ spotify }) => {
    return spotify.call("GET", "/me/player/devices") as any
  },
})
