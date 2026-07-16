// secret-scanning — Retrieve secret scanning alerts from a repository.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { NotFoundError } from '@pikku/core/errors'
import { alertnumberSchema } from '../github.types.js'

export const SecretScanningListLocationsForAlertInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  alert_number: alertnumberSchema.describe("The number that identifies an alert. You can find this at the end of the URL for a code scanning alert within GitHub, and in the `number` field in the response from the `GET /repos/{owner}/{repo}/code-scanning/alerts` operation."),
  page: z.number().int().optional().default(1).describe("Page number of the results to fetch."),
  per_page: z.number().int().optional().default(30).describe("The number of results per page (max 100)."),
})

export const SecretScanningListLocationsForAlertOutput = z.array(z.object({
  details: z.union([z.object({
    blob_sha: z.string().describe("SHA-1 hash ID of the associated blob"),
    blob_url: z.string().describe("The API URL to get the associated blob resource"),
    commit_sha: z.string().describe("SHA-1 hash ID of the associated commit"),
    commit_url: z.string().describe("The API URL to get the associated commit resource"),
    end_column: z.number().describe("The column at which the secret ends within the end line when the file is interpreted as 8BIT ASCII"),
    end_line: z.number().describe("Line number at which the secret ends in the file"),
    path: z.string().describe("The file path in the repository"),
    start_column: z.number().describe("The column at which the secret starts within the start line when the file is interpreted as 8BIT ASCII"),
    start_line: z.number().describe("Line number at which the secret starts in the file"),
  }), z.object({
    issue_title_url: z.string().url().describe("The API URL to get the issue where the secret was detected."),
  }), z.object({
    issue_body_url: z.string().url().describe("The API URL to get the issue where the secret was detected."),
  }), z.object({
    issue_comment_url: z.string().url().describe("The API URL to get the issue comment where the secret was detected."),
  })]),
  type: z.enum(["commit", "issue_title", "issue_body", "issue_comment"]).describe("The location type. Because secrets may be found in different types of resources (ie. code, comments, issues), this field identifies the type of resource where the secret was found."),
})).describe("List of locations where the secret was detected")

export const secretScanningListLocationsForAlert = pikkuSessionlessFunc({
  description: "Lists all locations for a given secret scanning alert for an eligible repository.\nTo use this endpoint, you must be an administrator for the repository or for the organization that owns the repository, and you must use a personal access token with the `repo` scope or `security_events` scope.\nFor public repositories, you may instead use the `public_repo` scope.\n\nGitHub Apps must have the `secret_scanning_alerts` read permission to use this endpoint.",
  input: SecretScanningListLocationsForAlertInput,
  output: SecretScanningListLocationsForAlertOutput,
  errors: [NotFoundError],
  func: async ({ github }, data) => {
    return github.call("GET", "/repos/{owner}/{repo}/secret-scanning/alerts/{alert_number}/locations", data) as any
  },
})
