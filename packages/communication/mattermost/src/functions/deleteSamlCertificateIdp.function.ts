// SAML — Endpoints for configuring and interacting with SAML.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const DeleteSamlCertificateIdpOutput = z.object({
  status: z.string().optional().describe("Will contain \"ok\" if the request was successful and there was nothing else to return"),
})

export const deleteSamlCertificateIdp = pikkuSessionlessFunc({
  description: "Delete the current IDP certificate being used with your SAML configuration. This will also disable SAML on your system as this certificate is required for SAML.\n##### Permissions\nMust have `manage_system` permission.",
  output: DeleteSamlCertificateIdpOutput,
  errors: [UnauthorizedError, ForbiddenError],
  func: async ({ mattermost }) => {
    return mattermost.call("DELETE", "/saml/certificate/idp") as any
  },
})
