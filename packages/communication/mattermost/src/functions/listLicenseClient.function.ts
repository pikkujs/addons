// system — General endpoints for interating with the server, such as configuration and logging.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError } from '@pikku/core/errors'

export const ListLicenseClientInput = z.object({
  format: z.string().describe("Must be `old`, other formats not implemented yet"),
})

export const listLicenseClient = pikkuSessionlessFunc({
  description: "Get a subset of the server license needed by the client.\n##### Permissions\nNo permission required but having the `manage_system` permission returns more information.",
  input: ListLicenseClientInput,
  errors: [BadRequestError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("GET", "/license/client", data)
  },
})
