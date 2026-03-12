import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const PlatformPlacementsPostInput = z.object({
  compute: z.object({
  cpu_kind: z.string().optional(),
  cpus: z.number().int().optional(),
  gpu_kind: z.string().optional(),
  gpus: z.number().int().optional(),
  host_dedication_id: z.string().optional(),
  kernel_args: z.array(z.string()).optional(),
  memory_mb: z.number().int().optional(),
  persist_rootfs: z.enum(["never", "always", "restart"]).optional().describe("Deprecated: use MachineConfig.Rootfs instead"),
}).optional().describe("Resource requirements for the Machine to simulate. Defaults to a performance-1x machine").describe("Resource requirements for the Machine to simulate. Defaults to a performance-1x machine"),
  count: z.number().int().optional().describe("Number of machines to simulate placement.\nDefaults to 0, which returns the org-specific limit for each region.").describe("Number of machines to simulate placement.\nDefaults to 0, which returns the org-specific limit for each region."),
  org_slug: z.string(),
  region: z.string().optional().describe("Region expression for placement as a comma-delimited set of regions or aliases.\nDefaults to \"[region],any\", to prefer the API endpoint's local region with any other region as fallback.").describe("Region expression for placement as a comma-delimited set of regions or aliases.\nDefaults to \"[region],any\", to prefer the API endpoint's local region with any other region as fallback."),
  volume_name: z.string().optional(),
  volume_size_bytes: z.number().int().optional(),
  weights: z.unknown().optional().describe("Optional weights to override default placement preferences.").describe("Optional weights to override default placement preferences."),
})

export const PlatformPlacementsPostOutput = z.object({
  regions: z.array(z.object({
    concurrency: z.number().int().optional(),
    count: z.number().int().optional(),
    region: z.string().optional(),
  })).optional(),
})

export const platformPlacementsPost = pikkuSessionlessFunc({
  description: "Simulates placing the specified number of machines into regions, depending on available capacity and limits.",
  input: PlatformPlacementsPostInput,
  output: PlatformPlacementsPostOutput,
  func: async ({ flyio }, data) => {
    return flyio.call('POST', '/platform/placements', data) as any
  },
})
