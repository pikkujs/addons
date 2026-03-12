// TLS Certificates — This site hosts documentation generated from the Fly.io Machines API OpenAPI specification. Visit our complete [Machines API docs](https://fly.io/docs/machines/api/certificates-resource/) for details about using the TLS Certificates resource.


import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const AppCertificatesListInput = z.object({
  app_name: z.string().describe("Fly App Name"),
  filter: z.string().optional().describe("Hostname filter (substring match)"),
  cursor: z.string().optional().describe("Pagination cursor from previous response"),
  limit: z.number().int().optional().describe("Number of results per page (default 25, max 500)"),
})

export const AppCertificatesListOutput = z.object({
  certificates: z.array(z.object({
    acme_alpn_configured: z.boolean().optional(),
    acme_dns_configured: z.boolean().optional(),
    acme_http_configured: z.boolean().optional(),
    acme_requested: z.boolean().optional(),
    configured: z.boolean().optional(),
    created_at: z.string().optional(),
    dns_provider: z.string().optional(),
    has_custom_certificate: z.boolean().optional(),
    has_fly_certificate: z.boolean().optional(),
    hostname: z.string().optional(),
    ownership_txt_configured: z.boolean().optional(),
    status: z.string().optional(),
    updated_at: z.string().optional(),
  })).optional(),
  next_cursor: z.string().optional(),
  total_count: z.number().int().optional(),
})

export const appCertificatesList = pikkuSessionlessFunc({
  input: AppCertificatesListInput,
  output: AppCertificatesListOutput,
  func: async ({ flyio }, data) => {
    return flyio.call('GET', '/apps/{app_name}/certificates', data) as any
  },
})
