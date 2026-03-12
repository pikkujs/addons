// Machines — This site hosts documentation generated from the Fly.io Machines API OpenAPI specification. Visit our complete [Machines API docs](https://fly.io/docs/machines/api/machines-resource/) for details about using the Machines resource.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const MachinesDeleteMetadataInput = z.object({
  app_name: z.string().describe("Fly App Name"),
  machine_id: z.string().describe("Machine ID"),
  key: z.string().describe("Metadata Key"),
})

export const machinesDeleteMetadata = pikkuSessionlessFunc({
  description: "Delete metadata for a specific Machine within an app by providing a metadata key.",
  input: MachinesDeleteMetadataInput,
  output: z.void(),
  func: async ({ flyio }, data) => {
    return flyio.call('DELETE', '/apps/{app_name}/machines/{machine_id}/metadata/{key}', data)
  },
})
