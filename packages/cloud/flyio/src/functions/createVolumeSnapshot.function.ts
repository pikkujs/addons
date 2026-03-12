// Volumes — This site hosts documentation generated from the Fly.io Machines API OpenAPI specification. Visit our complete [Machines API docs](https://fly.io/docs/machines/api/volumes-resource/) for details about using the Volumes resource.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CreateVolumeSnapshotInput = z.object({
  app_name: z.string().describe("Fly App Name"),
  volume_id: z.string().describe("Volume ID"),
})

export const createVolumeSnapshot = pikkuSessionlessFunc({
  description: "Create a snapshot for a specific volume within an app.",
  input: CreateVolumeSnapshotInput,
  output: z.void(),
  func: async ({ flyio }, data) => {
    return flyio.call('POST', '/apps/{app_name}/volumes/{volume_id}/snapshots', data)
  },
})
