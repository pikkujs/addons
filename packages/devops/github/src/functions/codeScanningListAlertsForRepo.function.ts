// code-scanning — Retrieve code scanning alerts from a repository.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { ForbiddenError, NotFoundError } from '@pikku/core/errors'
import { codescanninganalysistoolguidSchema, codescanninganalysistoolnameSchema, codescanningrefSchema } from '../github.types.js'

export const CodeScanningListAlertsForRepoInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  tool_name: codescanninganalysistoolnameSchema.optional().describe("The name of a code scanning tool. Only results by this tool will be listed. You can specify the tool by using either `tool_name` or `tool_guid`, but not both."),
  tool_guid: codescanninganalysistoolguidSchema.optional().describe("The GUID of a code scanning tool. Only results by this tool will be listed. Note that some code scanning tools may not include a GUID in their analysis data. You can specify the tool by using either `tool_guid` or `tool_name`, but not both."),
  page: z.number().int().optional().default(1).describe("Page number of the results to fetch."),
  per_page: z.number().int().optional().default(30).describe("The number of results per page (max 100)."),
  ref: codescanningrefSchema.optional().describe("The Git reference for the results you want to list. The `ref` for a branch can be formatted either as `refs/heads/<branch name>` or simply `<branch name>`. To reference a pull request use `refs/pull/<number>/merge`."),
  direction: z.enum(["asc", "desc"]).optional().default("desc").describe("The direction to sort the results by."),
  sort: z.enum(["created", "updated"]).optional().default("created").describe("The property by which to sort the results."),
  state: z.enum(["open", "closed", "dismissed", "fixed"]).optional().describe("State of a code scanning alert.").describe("If specified, only code scanning alerts with this state will be returned."),
  severity: z.enum(["critical", "high", "medium", "low", "warning", "note", "error"]).optional().describe("Severity of a code scanning alert.").describe("If specified, only code scanning alerts with this severity will be returned."),
})

export const CodeScanningListAlertsForRepoOutput = z.array(z.object({
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
    id: z.string().nullable().optional().describe("A unique identifier for the rule used to detect the alert."),
    name: z.string().optional().describe("The name of the rule used to detect the alert."),
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
}))

export const codeScanningListAlertsForRepo = pikkuSessionlessFunc({
  description: "Lists code scanning alerts.\n\nTo use this endpoint, you must use an access token with the `security_events` scope or, for alerts from public repositories only, an access token with the `public_repo` scope.\n\nGitHub Apps must have the `security_events` read\npermission to use this endpoint.\n\nThe response includes a `most_recent_instance` object.\nThis provides details of the most recent instance of this alert\nfor the default branch (or for the specified Git reference if you used `ref` in the request).",
  input: CodeScanningListAlertsForRepoInput,
  output: CodeScanningListAlertsForRepoOutput,
  errors: [ForbiddenError, NotFoundError],
  func: async ({ github }, data) => {
    return github.call("GET", "/repos/{owner}/{repo}/code-scanning/alerts", data) as any
  },
})
