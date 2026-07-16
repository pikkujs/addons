// code-scanning — Retrieve code scanning alerts from a repository.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { ForbiddenError, NotFoundError } from '@pikku/core/errors'
import { codescanninganalysistoolguidSchema, codescanninganalysistoolnameSchema } from '../github.types.js'

export const CodeScanningListRecentAnalysesInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  tool_name: codescanninganalysistoolnameSchema.optional().describe("The name of a code scanning tool. Only results by this tool will be listed. You can specify the tool by using either `tool_name` or `tool_guid`, but not both."),
  tool_guid: codescanninganalysistoolguidSchema.optional().describe("The GUID of a code scanning tool. Only results by this tool will be listed. Note that some code scanning tools may not include a GUID in their analysis data. You can specify the tool by using either `tool_guid` or `tool_name`, but not both."),
  page: z.number().int().optional().default(1).describe("Page number of the results to fetch."),
  per_page: z.number().int().optional().default(30).describe("The number of results per page (max 100)."),
  ref: z.string().optional().describe("The full Git reference, formatted as `refs/heads/<branch name>`,\n`refs/pull/<number>/merge`, or `refs/pull/<number>/head`.").describe("The Git reference for the analyses you want to list. The `ref` for a branch can be formatted either as `refs/heads/<branch name>` or simply `<branch name>`. To reference a pull request use `refs/pull/<number>/merge`."),
  sarif_id: z.string().optional().describe("An identifier for the upload.").describe("Filter analyses belonging to the same SARIF upload."),
  direction: z.enum(["asc", "desc"]).optional().default("desc").describe("The direction to sort the results by."),
  sort: z.literal("created").optional().default("created").describe("The property by which to sort the results."),
})

export const CodeScanningListRecentAnalysesOutput = z.array(z.object({
  analysis_key: z.string().describe("Identifies the configuration under which the analysis was executed. For example, in GitHub Actions this includes the workflow filename and job name."),
  category: z.string().optional().describe("Identifies the configuration under which the analysis was executed. Used to distinguish between multiple analyses for the same tool and commit, but performed on different languages or different parts of the code."),
  commit_sha: z.string().min(40).max(40).regex(new RegExp("^[0-9a-fA-F]+$")).describe("The SHA of the commit to which the analysis you are uploading relates."),
  created_at: z.string().datetime().describe("The time that the analysis was created in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`."),
  deletable: z.boolean(),
  environment: z.string().describe("Identifies the variable values associated with the environment in which this analysis was performed."),
  error: z.string(),
  id: z.number().int().describe("Unique identifier for this analysis."),
  ref: z.string().describe("The full Git reference, formatted as `refs/heads/<branch name>`,\n`refs/pull/<number>/merge`, or `refs/pull/<number>/head`."),
  results_count: z.number().int().describe("The total number of results in the analysis."),
  rules_count: z.number().int().describe("The total number of rules used in the analysis."),
  sarif_id: z.string().describe("An identifier for the upload."),
  tool: z.object({
    guid: z.string().nullable().optional().describe("The GUID of the tool used to generate the code scanning analysis, if provided in the uploaded SARIF data."),
    name: z.string().optional().describe("The name of the tool used to generate the code scanning analysis."),
    version: z.string().nullable().optional().describe("The version of the tool used to generate the code scanning analysis."),
  }),
  url: z.string().url().describe("The REST API URL of the analysis resource."),
  warning: z.string().describe("Warning generated when processing the analysis"),
}))

export const codeScanningListRecentAnalyses = pikkuSessionlessFunc({
  description: "Lists the details of all code scanning analyses for a repository,\nstarting with the most recent.\nThe response is paginated and you can use the `page` and `per_page` parameters\nto list the analyses you're interested in.\nBy default 30 analyses are listed per page.\n\nThe `rules_count` field in the response give the number of rules\nthat were run in the analysis.\nFor very old analyses this data is not available,\nand `0` is returned in this field.\n\nYou must use an access token with the `security_events` scope to use this endpoint with private repos,\nthe `public_repo` scope also grants permission to read security events on public repos only.\nGitHub Apps must have the `security_events` read permission to use this endpoint.\n\n**Deprecation notice**:\nThe `tool_name` field is deprecated and will, in future, not be included in the response for this endpoint. The example response reflects this change. The tool name can now be found inside the `tool` field.",
  input: CodeScanningListRecentAnalysesInput,
  output: CodeScanningListRecentAnalysesOutput,
  errors: [ForbiddenError, NotFoundError],
  func: async ({ github }, data) => {
    return github.call("GET", "/repos/{owner}/{repo}/code-scanning/analyses", data) as any
  },
})
