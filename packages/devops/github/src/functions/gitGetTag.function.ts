// git — Raw Git functionality.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { NotFoundError } from '@pikku/core/errors'

export const GitGetTagInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  tag_sha: z.string(),
})

export const GitGetTagOutput = z.object({
  message: z.string().describe("Message describing the purpose of the tag"),
  node_id: z.string(),
  object: z.object({
    sha: z.string(),
    type: z.string(),
    url: z.string().url(),
  }),
  sha: z.string(),
  tag: z.string().describe("Name of the tag"),
  tagger: z.object({
    date: z.string(),
    email: z.string(),
    name: z.string(),
  }),
  url: z.string().url().describe("URL for the tag"),
  verification: z.object({
    payload: z.string().nullable(),
    reason: z.string(),
    signature: z.string().nullable(),
    verified: z.boolean(),
  }).optional(),
}).describe("Metadata for a Git tag")

export const gitGetTag = pikkuSessionlessFunc({
  description: "**Signature verification object**\n\nThe response will include a `verification` object that describes the result of verifying the commit's signature. The following fields are included in the `verification` object:\n\n| Name | Type | Description |\n| ---- | ---- | ----------- |\n| `verified` | `boolean` | Indicates whether GitHub considers the signature in this commit to be verified. |\n| `reason` | `string` | The reason for verified value. Possible values and their meanings are enumerated in table below. |\n| `signature` | `string` | The signature that was extracted from the commit. |\n| `payload` | `string` | The value that was signed. |\n\nThese are the possible values for `reason` in the `verification` object:\n\n| Value | Description |\n| ----- | ----------- |\n| `expired_key` | The key that made the signature is expired. |\n| `not_signing_key` | The \"signing\" flag is not among the usage flags in the GPG key that made the signature. |\n| `gpgverify_error` | There was an error communicating with the signature verification service. |\n| `gpgverify_unavailable` | The signature verification service is currently unavailable. |\n| `unsigned` | The object does not include a signature. |\n| `unknown_signature_type` | A non-PGP signature was found in the commit. |\n| `no_user` | No user was associated with the `committer` email address in the commit. |\n| `unverified_email` | The `committer` email address in the commit was associated with a user, but the email address is not verified on her/his account. |\n| `bad_email` | The `committer` email address in the commit is not included in the identities of the PGP key that made the signature. |\n| `unknown_key` | The key that made the signature has not been registered with any user's account. |\n| `malformed_signature` | There was an error parsing the signature. |\n| `invalid` | The signature could not be cryptographically verified using the key whose key-id was found in the signature. |\n| `valid` | None of the above errors applied, so the signature is considered to be verified. |",
  input: GitGetTagInput,
  output: GitGetTagOutput,
  errors: [NotFoundError],
  func: async ({ github }, data) => {
    return github.call("GET", "/repos/{owner}/{repo}/git/tags/{tag_sha}", data) as any
  },
})
