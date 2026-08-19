// dependabot — Endpoints to manage Dependabot.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const DependabotGetOrgPublicKeyInput = z.object({
  org: z.string().describe("The organization name. The name is not case sensitive."),
})

export const DependabotGetOrgPublicKeyOutput = z.object({
  key: z.string().describe("The Base64 encoded public key."),
  key_id: z.string().describe("The identifier for the key."),
}).describe("The public key used for setting Dependabot Secrets.")

export const dependabotGetOrgPublicKey = pikkuSessionlessFunc({
  description: "Gets your public key, which you need to encrypt secrets. You need to encrypt a secret before you can create or update secrets. You must authenticate using an access token with the `admin:org` scope to use this endpoint. GitHub Apps must have the `dependabot_secrets` organization permission to use this endpoint.",
  input: DependabotGetOrgPublicKeyInput,
  output: DependabotGetOrgPublicKeyOutput,
  func: async ({ github }, data) => {
    return github.call("GET", "/orgs/{org}/dependabot/secrets/public-key", data) as any
  },
})
