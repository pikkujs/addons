import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ZonesGetInput = z.object({
  zone_id: z.string().describe('Zone ID'),
})

export const ZonesGetOutput = z.object({
  result: z.object({
    id: z.string().describe('Zone ID'),
    name: z.string().describe('Domain name'),
    status: z.string().describe('Zone status'),
    paused: z.boolean().describe('Whether zone is paused'),
    type: z.string().describe('Zone type'),
    name_servers: z.array(z.string()).describe('Assigned name servers'),
    original_name_servers: z.array(z.string()).optional().describe('Original name servers'),
  }),
  success: z.boolean(),
})

type Output = z.infer<typeof ZonesGetOutput>

export const zonesGet = pikkuSessionlessFunc({
  description: 'Get Cloudflare zone details',
  node: { displayName: 'Get Zone', category: 'Zones', type: 'action' },
  input: ZonesGetInput,
  output: ZonesGetOutput,
  func: async ({ cloudflare }, data) => {
    return await cloudflare.request<Output>('GET', `/zones/${data.zone_id}`)
  },
})
