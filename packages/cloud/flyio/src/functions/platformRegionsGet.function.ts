import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const PlatformRegionsGetInput = z.object({
  size: z.string().optional().describe("guest machine size preset. default performance-1x"),
  cpu_kind: z.string().optional().describe("guest CPU kind"),
  memory_mb: z.number().int().optional().describe("guest memory in megabytes"),
  cpus: z.number().int().optional().describe("guest CPU count"),
  gpus: z.number().int().optional().describe("guest GPU count"),
  gpu_kind: z.string().optional().describe("guest GPU kind"),
})

export const PlatformRegionsGetOutput = z.object({
  nearest: z.string().optional(),
  regions: z.array(z.object({
    capacity: z.number().int().optional(),
    code: z.string().optional(),
    deprecated: z.boolean().optional(),
    gateway_available: z.boolean().optional(),
    geo_region: z.string().optional(),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
    name: z.string().optional(),
    requires_paid_plan: z.boolean().optional(),
  })).optional(),
})

export const platformRegionsGet = pikkuSessionlessFunc({
  description: "List all regions on the platform with their current Machine capacity.",
  input: PlatformRegionsGetInput,
  output: PlatformRegionsGetOutput,
  func: async ({ flyio }, data) => {
    return flyio.call('GET', '/platform/regions', data) as any
  },
})
