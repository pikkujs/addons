// Volumes — This site hosts documentation generated from the Fly.io Machines API OpenAPI specification. Visit our complete [Machines API docs](https://fly.io/docs/machines/api/volumes-resource/) for details about using the Volumes resource.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const VolumesListSnapshotsInput = z.object({
  app_name: z.string().describe("Fly App Name"),
  volume_id: z.string().describe("Volume ID"),
})

export const VolumesListSnapshotsOutput = z.array(z.object({
  created_at: z.string().optional(),
  digest: z.string().optional(),
  id: z.string().optional(),
  retention_days: z.number().int().optional(),
  size: z.number().int().optional(),
  status: z.string().optional(),
  volume_size: z.number().int().optional(),
}))

export const volumesListSnapshots = pikkuSessionlessFunc({
  description: "List all snapshots for a specific volume within an app.",
  input: VolumesListSnapshotsInput,
  output: VolumesListSnapshotsOutput,
  func: async ({ flyio }, data) => {
    return flyio.call('GET', '/apps/{app_name}/volumes/{volume_id}/snapshots', data) as any
  },
})
