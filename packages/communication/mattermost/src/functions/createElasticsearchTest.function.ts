// elasticsearch — Endpoints for configuring and interacting with Elasticsearch.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, InternalServerError } from '@pikku/core/errors'

export const CreateElasticsearchTestOutput = z.object({
  status: z.string().optional().describe("Will contain \"ok\" if the request was successful and there was nothing else to return"),
})

export const createElasticsearchTest = pikkuSessionlessFunc({
  description: "Test the current Elasticsearch configuration to see if the Elasticsearch server can be contacted successfully.\nOptionally provide a configuration in the request body to test. If no valid configuration is present in the\nrequest body the current server configuration will be tested.\n\n__Minimum server version__: 4.1\n##### Permissions\nMust have `manage_system` permission.",
  output: CreateElasticsearchTestOutput,
  errors: [BadRequestError, InternalServerError],
  func: async ({ mattermost }) => {
    return mattermost.call("POST", "/elasticsearch/test") as any
  },
})
