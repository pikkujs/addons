// SAML — Endpoints for configuring and interacting with SAML.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ListSamlMetadataOutput = z.string()

export const listSamlMetadata = pikkuSessionlessFunc({
  description: "Get SAML metadata from the server. SAML must be configured properly.\n##### Permissions\nNo permission required.",
  output: ListSamlMetadataOutput,
  func: async ({ mattermost }) => {
    return mattermost.call("GET", "/saml/metadata") as any
  },
})
