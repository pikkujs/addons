// Machines — This site hosts documentation generated from the Fly.io Machines API OpenAPI specification. Visit our complete [Machines API docs](https://fly.io/docs/machines/api/machines-resource/) for details about using the Machines resource.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError } from '@pikku/core/errors'

export const MachinesUpsertMetadataInput = z.object({
  app_name: z.string().describe("Fly App Name"),
  machine_id: z.string().describe("Machine ID"),
  key: z.string().describe("Metadata Key"),
  updated_at: z.string().optional(),
  value: z.string().optional(),
})

export const machinesUpsertMetadata = pikkuSessionlessFunc({
  description: "Update metadata for a specific machine within an app by providing a metadata key.",
  input: MachinesUpsertMetadataInput,
  output: z.void(),
  errors: [BadRequestError],
  func: async ({ flyio }, data) => {
    return flyio.call('POST', '/apps/{app_name}/machines/{machine_id}/metadata/{key}', data)
  },
})
