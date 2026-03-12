// TLS Certificates — This site hosts documentation generated from the Fly.io Machines API OpenAPI specification. Visit our complete [Machines API docs](https://fly.io/docs/machines/api/certificates-resource/) for details about using the TLS Certificates resource.


import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const AppCertificatesCheckInput = z.object({
  app_name: z.string().describe("Fly App Name"),
  hostname: z.string().describe("Certificate Hostname"),
})

export const AppCertificatesCheckOutput = z.object({
  acme_requested: z.boolean().optional(),
  certificates: z.array(z.object({
    created_at: z.string().optional(),
    expires_at: z.string().optional(),
    issued: z.array(z.object({
      certificate_authority: z.string().optional(),
      expires_at: z.string().optional(),
      type: z.enum(["rsa", "ecdsa"]).optional(),
    })).optional(),
    issuer: z.string().optional(),
    source: z.enum(["custom", "fly"]).optional(),
    status: z.enum(["active", "pending_ownership", "pending_validation"]).optional(),
  })).optional(),
  configured: z.boolean().optional(),
  dns_provider: z.string().optional(),
  dns_records: z.object({
    a: z.array(z.string()).optional(),
    aaaa: z.array(z.string()).optional(),
    acme_challenge_cname: z.string().optional(),
    cname: z.array(z.string()).optional(),
    ownership_txt: z.string().optional(),
    resolved_addresses: z.array(z.string()).optional(),
    soa: z.string().optional(),
  }).optional(),
  dns_requirements: z.object({
    a: z.array(z.string()).optional(),
    aaaa: z.array(z.string()).optional(),
    acme_challenge: z.object({
      name: z.string().optional(),
      target: z.string().optional(),
    }).optional(),
    cname: z.string().optional(),
    ownership: z.object({
      app_value: z.string().optional(),
      name: z.string().optional(),
      org_value: z.string().optional(),
    }).optional(),
  }).optional(),
  hostname: z.string().optional(),
  rate_limited_until: z.string().optional(),
  status: z.string().optional(),
  validation: z.object({
    alpn_configured: z.boolean().optional(),
    dns_configured: z.boolean().optional(),
    http_configured: z.boolean().optional(),
    ownership_txt_configured: z.boolean().optional(),
  }).optional(),
  validation_errors: z.array(z.object({
    code: z.string().optional(),
    message: z.string().optional(),
    remediation: z.string().optional(),
    timestamp: z.string().optional(),
  })).optional(),
})

export const appCertificatesCheck = pikkuSessionlessFunc({
  input: AppCertificatesCheckInput,
  output: AppCertificatesCheckOutput,
  func: async ({ flyio }, data) => {
    return flyio.call('POST', '/apps/{app_name}/certificates/{hostname}/check', data) as any
  },
})
