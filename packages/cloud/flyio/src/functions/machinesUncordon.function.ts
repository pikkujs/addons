// Machines — This site hosts documentation generated from the Fly.io Machines API OpenAPI specification. Visit our complete [Machines API docs](https://fly.io/docs/machines/api/machines-resource/) for details about using the Machines resource.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const MachinesUncordonInput = z.object({
  app_name: z.string().describe("Fly App Name"),
  machine_id: z.string().describe("Machine ID"),
})

export const machinesUncordon = pikkuSessionlessFunc({
  description: "“Cordoning” a Machine refers to disabling its services, so the Fly Proxy won’t route requests to it. In flyctl this is used by blue/green deployments; one set of Machines is started up with services disabled, and when they are all healthy, the services are enabled on the new Machines and disabled on the old ones.",
  input: MachinesUncordonInput,
  output: z.void(),
  func: async ({ flyio }, data) => {
    return flyio.call('POST', '/apps/{app_name}/machines/{machine_id}/uncordon', data)
  },
})
