import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ZonesListInput = z.object({
  name: z.string().optional().describe('Domain name filter'),
  page: z.number().optional().describe('Page number'),
  per_page: z.number().optional().describe('Results per page (max 50)'),
})

export const ZoneSchema = z.object({
  id: z.string().describe('Zone ID'),
  name: z.string().describe('Domain name'),
  status: z.string().describe('Zone status'),
  paused: z.boolean().describe('Whether zone is paused'),
  type: z.string().describe('Zone type'),
  name_servers: z.array(z.string()).describe('Assigned name servers'),
})

export const ZonesListOutput = z.object({
  result: z.array(ZoneSchema),
  success: z.boolean(),
})

type Output = z.infer<typeof ZonesListOutput>

export const zonesList = pikkuSessionlessFunc({
  description: 'List Cloudflare zones (domains)',
  node: { displayName: 'List Zones', category: 'Zones', type: 'action' },
  input: ZonesListInput,
  output: ZonesListOutput,
  func: async ({ cloudflare }, data) => {
    return await cloudflare.request<Output>('GET', '/zones', { qs: data })
  },
})
