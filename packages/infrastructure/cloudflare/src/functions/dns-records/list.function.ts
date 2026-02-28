import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const DnsRecordsListInput = z.object({
  zone_id: z.string().describe('Zone ID'),
  type: z.string().optional().describe('DNS record type (A, AAAA, CNAME, etc)'),
  name: z.string().optional().describe('DNS record name'),
  page: z.number().optional().describe('Page number'),
  per_page: z.number().optional().describe('Results per page'),
})

const DnsRecordSchema = z.object({
  id: z.string().describe('Record ID'),
  type: z.string().describe('Record type'),
  name: z.string().describe('Record name'),
  content: z.string().describe('Record content'),
  proxied: z.boolean().describe('Whether proxied through Cloudflare'),
  ttl: z.number().describe('TTL in seconds'),
})

export const DnsRecordsListOutput = z.object({
  result: z.array(DnsRecordSchema),
  success: z.boolean(),
})

type Output = z.infer<typeof DnsRecordsListOutput>

export const dnsRecordsList = pikkuSessionlessFunc({
  description: 'List DNS records for a zone',
  node: { displayName: 'List DNS Records', category: 'DNS', type: 'action' },
  input: DnsRecordsListInput,
  output: DnsRecordsListOutput,
  func: async ({ cloudflare }, data) => {
    const { zone_id, ...qs } = data
    return await cloudflare.request<Output>('GET', `/zones/${zone_id}/dns_records`, { qs })
  },
})
