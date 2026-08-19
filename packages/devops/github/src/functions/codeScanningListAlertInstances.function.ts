// code-scanning — Retrieve code scanning alerts from a repository.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { ForbiddenError, NotFoundError } from '@pikku/core/errors'
import { alertnumberSchema, codescanningrefSchema } from '../github.types.js'

export const CodeScanningListAlertInstancesInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  alert_number: alertnumberSchema.describe("The number that identifies an alert. You can find this at the end of the URL for a code scanning alert within GitHub, and in the `number` field in the response from the `GET /repos/{owner}/{repo}/code-scanning/alerts` operation."),
  page: z.number().int().optional().default(1).describe("Page number of the results to fetch."),
  per_page: z.number().int().optional().default(30).describe("The number of results per page (max 100)."),
  ref: codescanningrefSchema.optional().describe("The Git reference for the results you want to list. The `ref` for a branch can be formatted either as `refs/heads/<branch name>` or simply `<branch name>`. To reference a pull request use `refs/pull/<number>/merge`."),
})

export const CodeScanningListAlertInstancesOutput = z.array(z.object({
  analysis_key: z.string().optional().describe("Identifies the configuration under which the analysis was executed. For example, in GitHub Actions this includes the workflow filename and job name."),
  category: z.string().optional().describe("Identifies the configuration under which the analysis was executed. Used to distinguish between multiple analyses for the same tool and commit, but performed on different languages or different parts of the code."),
  classifications: z.array(z.enum(["source", "generated", "test", "library"])).optional().describe("Classifications that have been applied to the file that triggered the alert.\nFor example identifying it as documentation, or a generated file."),
  commit_sha: z.string().optional(),
  environment: z.string().optional().describe("Identifies the variable values associated with the environment in which the analysis that generated this alert instance was performed, such as the language that was analyzed."),
  html_url: z.string().optional(),
  location: z.object({
    end_column: z.number().int().optional(),
    end_line: z.number().int().optional(),
    path: z.string().optional(),
    start_column: z.number().int().optional(),
    start_line: z.number().int().optional(),
  }).optional().describe("Describe a region within a file for the alert."),
  message: z.object({
    text: z.string().optional(),
  }).optional(),
  ref: z.string().optional().describe("The full Git reference, formatted as `refs/heads/<branch name>`,\n`refs/pull/<number>/merge`, or `refs/pull/<number>/head`."),
  state: z.enum(["open", "closed", "dismissed", "fixed"]).optional().describe("State of a code scanning alert."),
}))

export const codeScanningListAlertInstances = pikkuSessionlessFunc({
  description: "Lists all instances of the specified code scanning alert.\nYou must use an access token with the `security_events` scope to use this endpoint with private repos,\nthe `public_repo` scope also grants permission to read security events on public repos only.\nGitHub Apps must have the `security_events` read permission to use this endpoint.",
  input: CodeScanningListAlertInstancesInput,
  output: CodeScanningListAlertInstancesOutput,
  errors: [ForbiddenError, NotFoundError],
  func: async ({ github }, data) => {
    return github.call("GET", "/repos/{owner}/{repo}/code-scanning/alerts/{alert_number}/instances", data) as any
  },
})
