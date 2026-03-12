// Machines — This site hosts documentation generated from the Fly.io Machines API OpenAPI specification. Visit our complete [Machines API docs](https://fly.io/docs/machines/api/machines-resource/) for details about using the Machines resource.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const MachinesShowMetadataInput = z.object({
  app_name: z.string().describe("Fly App Name"),
  machine_id: z.string().describe("Machine ID"),
})

export const MachinesShowMetadataOutput = z.record(z.string(), z.string())

export const machinesShowMetadata = pikkuSessionlessFunc({
  description: "Retrieve metadata for a specific Machine within an app.",
  input: MachinesShowMetadataInput,
  output: MachinesShowMetadataOutput,
  func: async ({ flyio }, data) => {
    return flyio.call('GET', '/apps/{app_name}/machines/{machine_id}/metadata', data) as any
  },
})
