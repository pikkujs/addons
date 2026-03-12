// Machines — This site hosts documentation generated from the Fly.io Machines API OpenAPI specification. Visit our complete [Machines API docs](https://fly.io/docs/machines/api/machines-resource/) for details about using the Machines resource.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError } from '@pikku/core/errors'

export const MachinesUpdateMetadataInput = z.object({
  app_name: z.string().describe("Fly App Name"),
  machine_id: z.string().describe("Machine ID"),
  machine_version: z.string().optional(),
  metadata: z.record(z.string(), z.string()).optional(),
  updated_at: z.string().optional(),
})

export const machinesUpdateMetadata = pikkuSessionlessFunc({
  description: "Update multiple metadata keys at once. Null values and empty strings remove keys.\n+ If `machine_version` is provided and no longer matches the current machine version, returns 412 Precondition Failed.",
  input: MachinesUpdateMetadataInput,
  output: z.void(),
  errors: [BadRequestError],
  func: async ({ flyio }, data) => {
    return flyio.call('PUT', '/apps/{app_name}/machines/{machine_id}/metadata', data)
  },
})
