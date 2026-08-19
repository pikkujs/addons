// code-scanning — Retrieve code scanning alerts from a repository.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const CodeScanningListCodeqlDatabasesInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
})

export const CodeScanningListCodeqlDatabasesOutput = z.array(z.object({
  content_type: z.string().describe("The MIME type of the CodeQL database file."),
  created_at: z.string().datetime().describe("The date and time at which the CodeQL database was created, in ISO 8601 format':' YYYY-MM-DDTHH:MM:SSZ."),
  id: z.number().int().describe("The ID of the CodeQL database."),
  language: z.string().describe("The language of the CodeQL database."),
  name: z.string().describe("The name of the CodeQL database."),
  size: z.number().int().describe("The size of the CodeQL database file in bytes."),
  updated_at: z.string().datetime().describe("The date and time at which the CodeQL database was last updated, in ISO 8601 format':' YYYY-MM-DDTHH:MM:SSZ."),
  uploader: z.object({
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
  }).describe("A GitHub user."),
  url: z.string().url().describe("The URL at which to download the CodeQL database. The `Accept` header must be set to the value of the `content_type` property."),
}))

export const codeScanningListCodeqlDatabases = pikkuSessionlessFunc({
  description: "Lists the CodeQL databases that are available in a repository.\n\nFor private repositories, you must use an access token with the `security_events` scope.\nFor public repositories, you can use tokens with the `security_events` or `public_repo` scope.\nGitHub Apps must have the `contents` read permission to use this endpoint.",
  input: CodeScanningListCodeqlDatabasesInput,
  output: CodeScanningListCodeqlDatabasesOutput,
  errors: [ForbiddenError, NotFoundError],
  func: async ({ github }, data) => {
    return github.call("GET", "/repos/{owner}/{repo}/code-scanning/codeql/databases", data) as any
  },
})
