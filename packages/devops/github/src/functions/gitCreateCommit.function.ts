// git — Raw Git functionality.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { NotFoundError, UnprocessableContentError } from '@pikku/core/errors'

export const GitCreateCommitInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  author: z.object({
  date: z.string().datetime().optional().describe("Indicates when this commit was authored (or committed). This is a timestamp in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: `YYYY-MM-DDTHH:MM:SSZ`."),
  email: z.string().describe("The email of the author (or committer) of the commit"),
  name: z.string().describe("The name of the author (or committer) of the commit"),
}).optional().describe("Information about the author of the commit. By default, the `author` will be the authenticated user and the current date. See the `author` and `committer` object below for details."),
  committer: z.object({
  date: z.string().datetime().optional().describe("Indicates when this commit was authored (or committed). This is a timestamp in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: `YYYY-MM-DDTHH:MM:SSZ`."),
  email: z.string().optional().describe("The email of the author (or committer) of the commit"),
  name: z.string().optional().describe("The name of the author (or committer) of the commit"),
}).optional().describe("Information about the person who is making the commit. By default, `committer` will use the information set in `author`. See the `author` and `committer` object below for details."),
  message: z.string().describe("The commit message"),
  parents: z.array(z.string()).optional().describe("The SHAs of the commits that were the parents of this commit. If omitted or empty, the commit will be written as a root commit. For a single parent, an array of one SHA should be provided; for a merge commit, an array of more than one should be provided."),
  signature: z.string().optional().describe("The [PGP signature](https://en.wikipedia.org/wiki/Pretty_Good_Privacy) of the commit. GitHub adds the signature to the `gpgsig` header of the created commit. For a commit signature to be verifiable by Git or GitHub, it must be an ASCII-armored detached PGP signature over the string commit as it would be written to the object database. To pass a `signature` parameter, you need to first manually create a valid PGP signature, which can be complicated. You may find it easier to [use the command line](https://git-scm.com/book/id/v2/Git-Tools-Signing-Your-Work) to create signed commits."),
  tree: z.string().describe("The SHA of the tree object this commit points to"),
})

export const GitCreateCommitOutput = z.object({
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

export const gitCreateCommit = pikkuSessionlessFunc({
  description: "Creates a new Git [commit object](https://git-scm.com/book/en/v1/Git-Internals-Git-Objects#Commit-Objects).\n\n**Signature verification object**\n\nThe response will include a `verification` object that describes the result of verifying the commit's signature. The following fields are included in the `verification` object:\n\n| Name | Type | Description |\n| ---- | ---- | ----------- |\n| `verified` | `boolean` | Indicates whether GitHub considers the signature in this commit to be verified. |\n| `reason` | `string` | The reason for verified value. Possible values and their meanings are enumerated in the table below. |\n| `signature` | `string` | The signature that was extracted from the commit. |\n| `payload` | `string` | The value that was signed. |\n\nThese are the possible values for `reason` in the `verification` object:\n\n| Value | Description |\n| ----- | ----------- |\n| `expired_key` | The key that made the signature is expired. |\n| `not_signing_key` | The \"signing\" flag is not among the usage flags in the GPG key that made the signature. |\n| `gpgverify_error` | There was an error communicating with the signature verification service. |\n| `gpgverify_unavailable` | The signature verification service is currently unavailable. |\n| `unsigned` | The object does not include a signature. |\n| `unknown_signature_type` | A non-PGP signature was found in the commit. |\n| `no_user` | No user was associated with the `committer` email address in the commit. |\n| `unverified_email` | The `committer` email address in the commit was associated with a user, but the email address is not verified on her/his account. |\n| `bad_email` | The `committer` email address in the commit is not included in the identities of the PGP key that made the signature. |\n| `unknown_key` | The key that made the signature has not been registered with any user's account. |\n| `malformed_signature` | There was an error parsing the signature. |\n| `invalid` | The signature could not be cryptographically verified using the key whose key-id was found in the signature. |\n| `valid` | None of the above errors applied, so the signature is considered to be verified. |",
  input: GitCreateCommitInput,
  output: GitCreateCommitOutput,
  errors: [NotFoundError, UnprocessableContentError],
  func: async ({ github }, data) => {
    return github.call("POST", "/repos/{owner}/{repo}/git/commits", data) as any
  },
})
