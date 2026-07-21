// dataretention — Endpoint for getting data retention policy settings.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { InternalServerError } from '@pikku/core/errors'

export const ListDataRetentionPolicyOutput = z.object({
  message_deletion_enabled: z.boolean().optional().describe("Indicates whether data retention policy deletion of messages is enabled."),
  file_deletion_enabled: z.boolean().optional().describe("Indicates whether data retention policy deletion of file attachments is enabled."),
  message_retention_cutoff: z.number().int().optional().describe("The current server timestamp before which messages should be deleted."),
  file_retention_cutoff: z.number().int().optional().describe("The current server timestamp before which files should be deleted."),
})

export const listDataRetentionPolicy = pikkuSessionlessFunc({
  description: "Gets the current data retention policy details from the server, including what data should be purged and the cutoff times for each data type that should be purged.\n__Minimum server version__: 4.3\n##### Permissions\nRequires an active session but no other permissions.",
  output: ListDataRetentionPolicyOutput,
  errors: [InternalServerError],
  func: async ({ mattermost }) => {
    return mattermost.call("GET", "/data_retention/policy") as any
  },
})
