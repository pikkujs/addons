// dependabot — Endpoints to manage Dependabot.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const DependabotGetRepoPublicKeyInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
})

export const DependabotGetRepoPublicKeyOutput = z.object({
  key: z.string().describe("The Base64 encoded public key."),
  key_id: z.string().describe("The identifier for the key."),
}).describe("The public key used for setting Dependabot Secrets.")

export const dependabotGetRepoPublicKey = pikkuSessionlessFunc({
  description: "Gets your public key, which you need to encrypt secrets. You need to encrypt a secret before you can create or update secrets. Anyone with read access to the repository can use this endpoint. If the repository is private you must use an access token with the `repo` scope. GitHub Apps must have the `dependabot_secrets` repository permission to use this endpoint.",
  input: DependabotGetRepoPublicKeyInput,
  output: DependabotGetRepoPublicKeyOutput,
  func: async ({ github }, data) => {
    return github.call("GET", "/repos/{owner}/{repo}/dependabot/secrets/public-key", data) as any
  },
})
