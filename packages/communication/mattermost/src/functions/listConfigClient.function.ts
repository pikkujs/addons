// system — General endpoints for interating with the server, such as configuration and logging.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError } from '@pikku/core/errors'

export const ListConfigClientInput = z.object({
  format: z.string().describe("Must be `old`, other formats not implemented yet"),
})

export const listConfigClient = pikkuSessionlessFunc({
  description: "Get a subset of the server configuration needed by the client.\n##### Permissions\nNo permission required.",
  input: ListConfigClientInput,
  errors: [BadRequestError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("GET", "/config/client", data)
  },
})
