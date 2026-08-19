// git — Raw Git functionality.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { NotFoundError } from '@pikku/core/errors'

export const GitGetCommitInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  commit_sha: z.string().describe("The SHA of the commit."),
})

export const GitGetCommitOutput = z.object({
  author: z.object({
    date: z.string().datetime().describe("Timestamp of the commit"),
    email: z.string().describe("Git email address of the user"),
    name: z.string().describe("Name of the git user"),
  }).describe("Identifying information for the git-user"),
  committer: z.object({
    date: z.string().datetime().describe("Timestamp of the commit"),
    email: z.string().describe("Git email address of the user"),
    name: z.string().describe("Name of the git user"),
  }).describe("Identifying information for the git-user"),
  html_url: z.string().url(),
  message: z.string().describe("Message describing the purpose of the commit"),
  node_id: z.string(),
  parents: z.array(z.object({
    html_url: z.string().url(),
    sha: z.string().describe("SHA for the commit"),
    url: z.string().url(),
  })),
  sha: z.string().describe("SHA for the commit"),
  tree: z.object({
    sha: z.string().describe("SHA for the commit"),
    url: z.string().url(),
  }),
  url: z.string().url(),
  verification: z.object({
    payload: z.string().nullable(),
    reason: z.string(),
    signature: z.string().nullable(),
    verified: z.boolean(),
  }),
}).describe("Low-level Git commit operations within a repository")

export const gitGetCommit = pikkuSessionlessFunc({
  description: "Gets a Git [commit object](https://git-scm.com/book/en/v1/Git-Internals-Git-Objects#Commit-Objects).\n\n**Signature verification object**\n\nThe response will include a `verification` object that describes the result of verifying the commit's signature. The following fields are included in the `verification` object:\n\n| Name | Type | Description |\n| ---- | ---- | ----------- |\n| `verified` | `boolean` | Indicates whether GitHub considers the signature in this commit to be verified. |\n| `reason` | `string` | The reason for verified value. Possible values and their meanings are enumerated in the table below. |\n| `signature` | `string` | The signature that was extracted from the commit. |\n| `payload` | `string` | The value that was signed. |\n\nThese are the possible values for `reason` in the `verification` object:\n\n| Value | Description |\n| ----- | ----------- |\n| `expired_key` | The key that made the signature is expired. |\n| `not_signing_key` | The \"signing\" flag is not among the usage flags in the GPG key that made the signature. |\n| `gpgverify_error` | There was an error communicating with the signature verification service. |\n| `gpgverify_unavailable` | The signature verification service is currently unavailable. |\n| `unsigned` | The object does not include a signature. |\n| `unknown_signature_type` | A non-PGP signature was found in the commit. |\n| `no_user` | No user was associated with the `committer` email address in the commit. |\n| `unverified_email` | The `committer` email address in the commit was associated with a user, but the email address is not verified on her/his account. |\n| `bad_email` | The `committer` email address in the commit is not included in the identities of the PGP key that made the signature. |\n| `unknown_key` | The key that made the signature has not been registered with any user's account. |\n| `malformed_signature` | There was an error parsing the signature. |\n| `invalid` | The signature could not be cryptographically verified using the key whose key-id was found in the signature. |\n| `valid` | None of the above errors applied, so the signature is considered to be verified. |",
  input: GitGetCommitInput,
  output: GitGetCommitOutput,
  errors: [NotFoundError],
  func: async ({ github }, data) => {
    return github.call("GET", "/repos/{owner}/{repo}/git/commits/{commit_sha}", data) as any
  },
})
