// system — General endpoints for interating with the server, such as configuration and logging.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const CreateLicenseOutput = z.object({
  status: z.string().optional().describe("Will contain \"ok\" if the request was successful and there was nothing else to return"),
})

export const createLicense = pikkuSessionlessFunc({
  description: "Upload a license to enable enterprise features.\n\n__Minimum server version__: 4.0\n\n##### Permissions\nMust have `manage_system` permission.",
  output: CreateLicenseOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError],
  func: async ({ mattermost }) => {
    return mattermost.call("POST", "/license") as any
  },
})
