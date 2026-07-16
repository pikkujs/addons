// SAML — Endpoints for configuring and interacting with SAML.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const DeleteSamlCertificatePublicOutput = z.object({
  status: z.string().optional().describe("Will contain \"ok\" if the request was successful and there was nothing else to return"),
})

export const deleteSamlCertificatePublic = pikkuSessionlessFunc({
  description: "Delete the current public certificate being used with your SAML configuration. This will also disable encryption for SAML on your system as this certificate is required for that.\n##### Permissions\nMust have `manage_system` permission.",
  output: DeleteSamlCertificatePublicOutput,
  errors: [UnauthorizedError, ForbiddenError],
  func: async ({ mattermost }) => {
    return mattermost.call("DELETE", "/saml/certificate/public") as any
  },
})
