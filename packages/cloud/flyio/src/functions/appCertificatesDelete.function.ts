// TLS Certificates — This site hosts documentation generated from the Fly.io Machines API OpenAPI specification. Visit our complete [Machines API docs](https://fly.io/docs/machines/api/certificates-resource/) for details about using the TLS Certificates resource.


import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const AppCertificatesDeleteInput = z.object({
  app_name: z.string().describe("Fly App Name"),
  hostname: z.string().describe("Certificate Hostname"),
})

export const appCertificatesDelete = pikkuSessionlessFunc({
  input: AppCertificatesDeleteInput,
  output: z.void(),
  func: async ({ flyio }, data) => {
    return flyio.call('DELETE', '/apps/{app_name}/certificates/{hostname}', data)
  },
})
