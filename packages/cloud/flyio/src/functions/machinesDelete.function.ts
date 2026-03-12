// Machines — This site hosts documentation generated from the Fly.io Machines API OpenAPI specification. Visit our complete [Machines API docs](https://fly.io/docs/machines/api/machines-resource/) for details about using the Machines resource.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const MachinesDeleteInput = z.object({
  app_name: z.string().describe("Fly App Name"),
  machine_id: z.string().describe("Machine ID"),
  force: z.boolean().optional().describe("Force kill the machine if it's running"),
})

export const machinesDelete = pikkuSessionlessFunc({
  description: "Delete a specific Machine within an app by Machine ID, with an optional force parameter to force kill the Machine if it's running.",
  input: MachinesDeleteInput,
  output: z.void(),
  func: async ({ flyio }, data) => {
    return flyio.call('DELETE', '/apps/{app_name}/machines/{machine_id}', data)
  },
})
