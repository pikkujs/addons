// Machines — This site hosts documentation generated from the Fly.io Machines API OpenAPI specification. Visit our complete [Machines API docs](https://fly.io/docs/machines/api/machines-resource/) for details about using the Machines resource.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const MachinesReleaseLeaseInput = z.object({
  app_name: z.string().describe("Fly App Name"),
  machine_id: z.string().describe("Machine ID"),
  "fly-machine-lease-nonce": z.string().describe("Existing lease nonce"),
})

export const machinesReleaseLease = pikkuSessionlessFunc({
  description: "Release the lease of a specific Machine within an app. Machine leases can be used to obtain an exclusive lock on modifying a Machine.",
  input: MachinesReleaseLeaseInput,
  output: z.void(),
  func: async ({ flyio }, data) => {
    return flyio.call('DELETE', '/apps/{app_name}/machines/{machine_id}/lease', data)
  },
})
