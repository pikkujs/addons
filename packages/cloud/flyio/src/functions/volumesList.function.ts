// Volumes — This site hosts documentation generated from the Fly.io Machines API OpenAPI specification. Visit our complete [Machines API docs](https://fly.io/docs/machines/api/volumes-resource/) for details about using the Volumes resource.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const VolumesListInput = z.object({
  app_name: z.string().describe("Fly App Name"),
  summary: z.boolean().optional().describe("Only return summary info about volumes (omit blocks, block size, etc)"),
})

export const VolumesListOutput = z.array(z.object({
  attached_alloc_id: z.string().optional(),
  attached_machine_id: z.string().optional(),
  auto_backup_enabled: z.boolean().optional(),
  block_size: z.number().int().optional(),
  blocks: z.number().int().optional(),
  blocks_avail: z.number().int().optional(),
  blocks_free: z.number().int().optional(),
  bytes_total: z.number().int().optional(),
  bytes_used: z.number().int().optional(),
  created_at: z.string().optional(),
  encrypted: z.boolean().optional(),
  fstype: z.string().optional(),
  host_status: z.enum(["ok", "unknown", "unreachable"]).optional(),
  id: z.string().optional(),
  name: z.string().optional(),
  region: z.string().optional(),
  size_gb: z.number().int().optional(),
  snapshot_retention: z.number().int().optional(),
  state: z.string().optional(),
  zone: z.string().optional(),
}))

export const volumesList = pikkuSessionlessFunc({
  description: "List all volumes associated with a specific app.",
  input: VolumesListInput,
  output: VolumesListOutput,
  func: async ({ flyio }, data) => {
    return flyio.call('GET', '/apps/{app_name}/volumes', data) as any
  },
})
