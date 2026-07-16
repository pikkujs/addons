// meta — Endpoints that give information about the API.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const MetaGetOutput = z.object({
  actions: z.array(z.string()).optional(),
  api: z.array(z.string()).optional(),
  dependabot: z.array(z.string()).optional(),
  git: z.array(z.string()).optional(),
  hooks: z.array(z.string()).optional(),
  importer: z.array(z.string()).optional(),
  packages: z.array(z.string()).optional(),
  pages: z.array(z.string()).optional(),
  ssh_key_fingerprints: z.object({
    SHA256_DSA: z.string().optional(),
    SHA256_ECDSA: z.string().optional(),
    SHA256_ED25519: z.string().optional(),
    SHA256_RSA: z.string().optional(),
  }).optional(),
  ssh_keys: z.array(z.string()).optional(),
  verifiable_password_authentication: z.boolean(),
  web: z.array(z.string()).optional(),
}).describe("Api Overview")

export const metaGet = pikkuSessionlessFunc({
  description: "Returns meta information about GitHub, including a list of GitHub's IP addresses. For more information, see \"[About GitHub's IP addresses](https://docs.github.com/articles/about-github-s-ip-addresses/).\"\n\n**Note:** This endpoint returns both IPv4 and IPv6 addresses. However, not all features support IPv6. You should refer to the specific documentation for each feature to determine if IPv6 is supported.\n\n**Note:** The IP addresses shown in the documentation's response are only example values. You must always query the API directly to get the latest list of IP addresses.",
  output: MetaGetOutput,
  func: async ({ github }) => {
    return github.call("GET", "/meta") as any
  },
})
