// code-scanning — Retrieve code scanning alerts from a repository.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { ForbiddenError, NotFoundError } from '@pikku/core/errors'
import { alertnumberSchema } from '../github.types.js'

export const CodeScanningUpdateAlertInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  alert_number: alertnumberSchema.describe("The number that identifies an alert. You can find this at the end of the URL for a code scanning alert within GitHub, and in the `number` field in the response from the `GET /repos/{owner}/{repo}/code-scanning/alerts` operation."),
  dismissed_comment: z.string().max(280).nullable().optional().describe("The dismissal comment associated with the dismissal of the alert."),
  dismissed_reason: z.union([z.literal(null), z.literal("false positive"), z.literal("won't fix"), z.literal("used in tests")]).nullable().optional().describe("**Required when the state is dismissed.** The reason for dismissing or closing the alert."),
  state: z.enum(["open", "dismissed"]).describe("Sets the state of the code scanning alert. You must provide `dismissed_reason` when you set the state to `dismissed`."),
})

export const CodeScanningUpdateAlertOutput = z.object({
  created_at: z.string().datetime().describe("The time that the alert was created in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`."),
  dismissed_at: z.string().datetime().nullable().describe("The time that the alert was dismissed in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`."),
  dismissed_by: z.object({
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
  dismissed_comment: z.string().max(280).nullable().optional().describe("The dismissal comment associated with the dismissal of the alert."),
  dismissed_reason: z.union([z.literal(null), z.literal("false positive"), z.literal("won't fix"), z.literal("used in tests")]).nullable().describe("**Required when the state is dismissed.** The reason for dismissing or closing the alert."),
  fixed_at: z.string().datetime().nullable().optional().describe("The time that the alert was no longer detected and was considered fixed in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`."),
  html_url: z.string().url().describe("The GitHub URL of the alert resource."),
  instances_url: z.string().url().describe("The REST API URL for fetching the list of instances for an alert."),
  most_recent_instance: z.object({
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
  }),
  number: z.number().int().describe("The security alert number."),
  rule: z.object({
    description: z.string().optional().describe("A short description of the rule used to detect the alert."),
    full_description: z.string().optional().describe("description of the rule used to detect the alert."),
    help: z.string().nullable().optional().describe("Detailed documentation for the rule as GitHub Flavored Markdown."),
    help_uri: z.string().nullable().optional().describe("A link to the documentation for the rule used to detect the alert."),
    id: z.string().nullable().optional().describe("A unique identifier for the rule used to detect the alert."),
    name: z.string().optional().describe("The name of the rule used to detect the alert."),
    security_severity_level: z.enum(["low", "medium", "high", "critical"]).nullable().optional().describe("The security severity of the alert."),
    severity: z.enum(["none", "note", "warning", "error"]).nullable().optional().describe("The severity of the alert."),
    tags: z.array(z.string()).nullable().optional().describe("A set of tags applicable for the rule."),
  }),
  state: z.enum(["open", "closed", "dismissed", "fixed"]).describe("State of a code scanning alert."),
  tool: z.object({
    guid: z.string().nullable().optional().describe("The GUID of the tool used to generate the code scanning analysis, if provided in the uploaded SARIF data."),
    name: z.string().optional().describe("The name of the tool used to generate the code scanning analysis."),
    version: z.string().nullable().optional().describe("The version of the tool used to generate the code scanning analysis."),
  }),
  updated_at: z.string().datetime().optional().describe("The time that the alert was last updated in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`."),
  url: z.string().url().describe("The REST API URL of the alert resource."),
})

export const codeScanningUpdateAlert = pikkuSessionlessFunc({
  description: "Updates the status of a single code scanning alert. You must use an access token with the `security_events` scope to use this endpoint with private repositories. You can also use tokens with the `public_repo` scope for public repositories only. GitHub Apps must have the `security_events` write permission to use this endpoint.",
  input: CodeScanningUpdateAlertInput,
  output: CodeScanningUpdateAlertOutput,
  errors: [ForbiddenError, NotFoundError],
  func: async ({ github }, data) => {
    return github.call("PATCH", "/repos/{owner}/{repo}/code-scanning/alerts/{alert_number}", data) as any
  },
})
