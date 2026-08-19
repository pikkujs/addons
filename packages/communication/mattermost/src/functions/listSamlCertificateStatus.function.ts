// SAML — Endpoints for configuring and interacting with SAML.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { ForbiddenError } from '@pikku/core/errors'

export const ListSamlCertificateStatusOutput = z.object({
  idp_certificate_file: z.boolean().optional().describe("Status is good when `true`"),
  public_certificate_file: z.boolean().optional().describe("Status is good when `true`"),
  private_key_file: z.boolean().optional().describe("Status is good when `true`"),
})

export const listSamlCertificateStatus = pikkuSessionlessFunc({
  description: "Get the status of the uploaded certificates and keys in use by your SAML configuration.\n##### Permissions\nMust have `manage_system` permission.",
  output: ListSamlCertificateStatusOutput,
  errors: [ForbiddenError],
  func: async ({ mattermost }) => {
    return mattermost.call("GET", "/saml/certificate/status") as any
  },
})
