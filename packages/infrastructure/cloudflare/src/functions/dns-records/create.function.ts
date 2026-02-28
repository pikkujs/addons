import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const DnsRecordsCreateInput = z.object({
  zone_id: z.string().describe('Zone ID'),
  type: z.string().describe('DNS record type (A, AAAA, CNAME, TXT, MX, etc)'),
  name: z.string().describe('DNS record name'),
  content: z.string().describe('Record content'),
  ttl: z.number().optional().describe('TTL in seconds (1 = auto)'),
  proxied: z.boolean().optional().describe('Whether to proxy through Cloudflare'),
  priority: z.number().optional().describe('Priority (for MX records)'),
})

export const DnsRecordsCreateOutput = z.object({
  result: z.object({
    id: z.string().describe('Record ID'),
    type: z.string().describe('Record type'),
    name: z.string().describe('Record name'),
    content: z.string().describe('Record content'),
    proxied: z.boolean().describe('Whether proxied'),
    ttl: z.number().describe('TTL'),
  }),
  success: z.boolean(),
})

type Output = z.infer<typeof DnsRecordsCreateOutput>

export const dnsRecordsCreate = pikkuSessionlessFunc({
  description: 'Create a DNS record',
  node: { displayName: 'Create DNS Record', category: 'DNS', type: 'action' },
  input: DnsRecordsCreateInput,
  output: DnsRecordsCreateOutput,
  func: async ({ cloudflare }, data) => {
    const { zone_id, ...body } = data
    return await cloudflare.request<Output>('POST', `/zones/${zone_id}/dns_records`, { body })
  },
})
