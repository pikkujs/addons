// Machines — This site hosts documentation generated from the Fly.io Machines API OpenAPI specification. Visit our complete [Machines API docs](https://fly.io/docs/machines/api/machines-resource/) for details about using the Machines resource.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { NotFoundError } from '@pikku/core/errors'

export const MachinesGetMetadataKeyInput = z.object({
  app_name: z.string().describe("Fly App Name"),
  machine_id: z.string().describe("Machine ID"),
  key: z.string().describe("Metadata Key"),
})

export const MachinesGetMetadataKeyOutput = z.object({
  value: z.string().optional(),
})

export const machinesGetMetadataKey = pikkuSessionlessFunc({
  description: "Get the value of a specific metadata key",
  input: MachinesGetMetadataKeyInput,
  output: MachinesGetMetadataKeyOutput,
  errors: [NotFoundError],
  func: async ({ flyio }, data) => {
    return flyio.call('GET', '/apps/{app_name}/machines/{machine_id}/metadata/{key}', data) as any
  },
})
