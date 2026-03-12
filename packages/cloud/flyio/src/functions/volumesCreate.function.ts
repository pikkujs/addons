// Volumes — This site hosts documentation generated from the Fly.io Machines API OpenAPI specification. Visit our complete [Machines API docs](https://fly.io/docs/machines/api/volumes-resource/) for details about using the Volumes resource.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const VolumesCreateInput = z.object({
  app_name: z.string().describe("Fly App Name"),
  auto_backup_enabled: z.boolean().optional().describe("enable scheduled automatic snapshots. Defaults to `true`").describe("enable scheduled automatic snapshots. Defaults to `true`"),
  compute: z.object({
  cpu_kind: z.string().optional(),
  cpus: z.number().int().optional(),
  gpu_kind: z.string().optional(),
  gpus: z.number().int().optional(),
  host_dedication_id: z.string().optional(),
  kernel_args: z.array(z.string()).optional(),
  memory_mb: z.number().int().optional(),
  persist_rootfs: z.enum(["never", "always", "restart"]).optional().describe("Deprecated: use MachineConfig.Rootfs instead"),
}).optional(),
  compute_image: z.string().optional(),
  encrypted: z.boolean().optional(),
  fstype: z.string().optional(),
  name: z.string().optional(),
  region: z.string().optional(),
  require_unique_zone: z.boolean().optional(),
  size_gb: z.number().int().optional(),
  snapshot_id: z.string().optional().describe("restore from snapshot").describe("restore from snapshot"),
  snapshot_retention: z.number().int().optional(),
  source_volume_id: z.string().optional().describe("fork from remote volume").describe("fork from remote volume"),
  unique_zone_app_wide: z.boolean().optional(),
})

export const VolumesCreateOutput = z.object({
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
})

export const volumesCreate = pikkuSessionlessFunc({
  description: "Create a volume for a specific app using the details provided in the request body.",
  input: VolumesCreateInput,
  output: VolumesCreateOutput,
  func: async ({ flyio }, data) => {
    return flyio.call('POST', '/apps/{app_name}/volumes', data) as any
  },
})
