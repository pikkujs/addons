// SAML — Endpoints for configuring and interacting with SAML.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const CreateSamlCertificatePublicOutput = z.object({
  status: z.string().optional().describe("Will contain \"ok\" if the request was successful and there was nothing else to return"),
})

export const createSamlCertificatePublic = pikkuSessionlessFunc({
  description: "Upload the public certificate to be used for encryption with your SAML configuration. The server will pick a hard-coded filename for the PublicCertificateFile setting in your `config.json`.\n##### Permissions\nMust have `manage_system` permission.",
  output: CreateSamlCertificatePublicOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError],
  func: async ({ mattermost }) => {
    return mattermost.call("POST", "/saml/certificate/public") as any
  },
})
