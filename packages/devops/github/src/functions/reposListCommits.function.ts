// repos — Interact with GitHub Repos.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, NotFoundError, ConflictError, InternalServerError } from '@pikku/core/errors'

export const ReposListCommitsInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  sha: z.string().optional().describe("SHA or branch to start listing commits from. Default: the repository’s default branch (usually `main`)."),
  path: z.string().optional().describe("Only commits containing this file path will be returned."),
  author: z.string().optional().describe("GitHub login or email address by which to filter by commit author."),
  since: z.string().datetime().optional().describe("Only show notifications updated after the given time. This is a timestamp in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: `YYYY-MM-DDTHH:MM:SSZ`."),
  until: z.string().datetime().optional().describe("Only commits before this date will be returned. This is a timestamp in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: `YYYY-MM-DDTHH:MM:SSZ`."),
  per_page: z.number().int().optional().default(30).describe("The number of results per page (max 100)."),
  page: z.number().int().optional().default(1).describe("Page number of the results to fetch."),
})

export const ReposListCommitsOutput = z.array(z.object({
  author: z.object({
    avatar_url: z.string().url(),
    email: z.string().nullable().optional(),
    events_url: z.string(),
    followers_url: z.string().url(),
    following_url: z.string(),
    gists_url: z.string(),
    gravatar_id: z.string().nullable(),
    html_url: z.string().url(),
    id: z.number().int(),
    login: z.string(),
    name: z.string().nullable().optional(),
    node_id: z.string(),
    organizations_url: z.string().url(),
    received_events_url: z.string().url(),
    repos_url: z.string().url(),
    site_admin: z.boolean(),
    starred_at: z.string().optional(),
    starred_url: z.string(),
    subscriptions_url: z.string().url(),
    type: z.string(),
    url: z.string().url(),
  }).nullable().describe("A GitHub user."),
  comments_url: z.string().url(),
  commit: z.object({
    author: z.object({
      date: z.string().optional(),
      email: z.string().optional(),
      name: z.string().optional(),
    }).nullable().describe("Metaproperties for Git author/committer information."),
    comment_count: z.number().int(),
    committer: z.object({
      date: z.string().optional(),
      email: z.string().optional(),
      name: z.string().optional(),
    }).nullable().describe("Metaproperties for Git author/committer information."),
    message: z.string(),
    tree: z.object({
      sha: z.string(),
      url: z.string().url(),
    }),
    url: z.string().url(),
    verification: z.object({
      payload: z.string().nullable(),
      reason: z.string(),
      signature: z.string().nullable(),
      verified: z.boolean(),
    }).optional(),
  }),
  committer: z.object({
    avatar_url: z.string().url(),
    email: z.string().nullable().optional(),
    events_url: z.string(),
    followers_url: z.string().url(),
    following_url: z.string(),
    gists_url: z.string(),
    gravatar_id: z.string().nullable(),
    html_url: z.string().url(),
    id: z.number().int(),
    login: z.string(),
    name: z.string().nullable().optional(),
    node_id: z.string(),
    organizations_url: z.string().url(),
    received_events_url: z.string().url(),
    repos_url: z.string().url(),
    site_admin: z.boolean(),
    starred_at: z.string().optional(),
    starred_url: z.string(),
    subscriptions_url: z.string().url(),
    type: z.string(),
    url: z.string().url(),
  }).nullable().describe("A GitHub user."),
  files: z.array(z.object({
    additions: z.number().int(),
    blob_url: z.string().url(),
    changes: z.number().int(),
    contents_url: z.string().url(),
    deletions: z.number().int(),
    filename: z.string(),
    patch: z.string().optional(),
    previous_filename: z.string().optional(),
    raw_url: z.string().url(),
    sha: z.string(),
    status: z.enum(["added", "removed", "modified", "renamed", "copied", "changed", "unchanged"]),
  })).optional(),
  html_url: z.string().url(),
  node_id: z.string(),
  parents: z.array(z.object({
    html_url: z.string().url().optional(),
    sha: z.string(),
    url: z.string().url(),
  })),
  sha: z.string(),
  stats: z.object({
    additions: z.number().int().optional(),
    deletions: z.number().int().optional(),
    total: z.number().int().optional(),
  }).optional(),
  url: z.string().url(),
}))

export const reposListCommits = pikkuSessionlessFunc({
  description: "**Signature verification object**\n\nThe response will include a `verification` object that describes the result of verifying the commit's signature. The following fields are included in the `verification` object:\n\n| Name | Type | Description |\n| ---- | ---- | ----------- |\n| `verified` | `boolean` | Indicates whether GitHub considers the signature in this commit to be verified. |\n| `reason` | `string` | The reason for verified value. Possible values and their meanings are enumerated in table below. |\n| `signature` | `string` | The signature that was extracted from the commit. |\n| `payload` | `string` | The value that was signed. |\n\nThese are the possible values for `reason` in the `verification` object:\n\n| Value | Description |\n| ----- | ----------- |\n| `expired_key` | The key that made the signature is expired. |\n| `not_signing_key` | The \"signing\" flag is not among the usage flags in the GPG key that made the signature. |\n| `gpgverify_error` | There was an error communicating with the signature verification service. |\n| `gpgverify_unavailable` | The signature verification service is currently unavailable. |\n| `unsigned` | The object does not include a signature. |\n| `unknown_signature_type` | A non-PGP signature was found in the commit. |\n| `no_user` | No user was associated with the `committer` email address in the commit. |\n| `unverified_email` | The `committer` email address in the commit was associated with a user, but the email address is not verified on her/his account. |\n| `bad_email` | The `committer` email address in the commit is not included in the identities of the PGP key that made the signature. |\n| `unknown_key` | The key that made the signature has not been registered with any user's account. |\n| `malformed_signature` | There was an error parsing the signature. |\n| `invalid` | The signature could not be cryptographically verified using the key whose key-id was found in the signature. |\n| `valid` | None of the above errors applied, so the signature is considered to be verified. |",
  input: ReposListCommitsInput,
  output: ReposListCommitsOutput,
  errors: [BadRequestError, NotFoundError, ConflictError, InternalServerError],
  func: async ({ github }, data) => {
    return github.call("GET", "/repos/{owner}/{repo}/commits", data) as any
  },
})
