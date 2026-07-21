// elasticsearch — Endpoints for configuring and interacting with Elasticsearch.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { InternalServerError } from '@pikku/core/errors'

export const CreateElasticsearchPurgeIndexesOutput = z.object({
  status: z.string().optional().describe("Will contain \"ok\" if the request was successful and there was nothing else to return"),
})

export const createElasticsearchPurgeIndexes = pikkuSessionlessFunc({
  description: "Deletes all Elasticsearch indexes and their contents. After calling this endpoint, it is\nnecessary to schedule a new Elasticsearch indexing job to repopulate the indexes.\n__Minimum server version__: 4.1\n##### Permissions\nMust have `manage_system` permission.",
  output: CreateElasticsearchPurgeIndexesOutput,
  errors: [InternalServerError],
  func: async ({ mattermost }) => {
    return mattermost.call("POST", "/elasticsearch/purge_indexes") as any
  },
})
