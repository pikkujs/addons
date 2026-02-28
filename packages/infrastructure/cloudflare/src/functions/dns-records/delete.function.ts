import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const DnsRecordsDeleteInput = z.object({
  zone_id: z.string().describe('Zone ID'),
  record_id: z.string().describe('DNS record ID'),
})

export const DnsRecordsDeleteOutput = z.object({
  result: z.object({
    id: z.string().describe('Deleted record ID'),
  }),
  success: z.boolean(),
})

type Output = z.infer<typeof DnsRecordsDeleteOutput>

export const dnsRecordsDelete = pikkuSessionlessFunc({
  description: 'Delete a DNS record',
  node: { displayName: 'Delete DNS Record', category: 'DNS', type: 'action' },
  input: DnsRecordsDeleteInput,
  output: DnsRecordsDeleteOutput,
  func: async ({ cloudflare }, data) => {
    return await cloudflare.request<Output>('DELETE', `/zones/${data.zone_id}/dns_records/${data.record_id}`)
  },
})
