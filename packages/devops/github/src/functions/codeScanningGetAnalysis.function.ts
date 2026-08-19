// code-scanning — Retrieve code scanning alerts from a repository.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const CodeScanningGetAnalysisInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  analysis_id: z.number().int().describe("The ID of the analysis, as returned from the `GET /repos/{owner}/{repo}/code-scanning/analyses` operation."),
})

export const CodeScanningGetAnalysisOutput = z.object({
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
})

export const codeScanningGetAnalysis = pikkuSessionlessFunc({
  description: "Gets a specified code scanning analysis for a repository.\nYou must use an access token with the `security_events` scope to use this endpoint with private repos,\nthe `public_repo` scope also grants permission to read security events on public repos only.\nGitHub Apps must have the `security_events` read permission to use this endpoint.\n\nThe default JSON response contains fields that describe the analysis.\nThis includes the Git reference and commit SHA to which the analysis relates,\nthe datetime of the analysis, the name of the code scanning tool,\nand the number of alerts.\n\nThe `rules_count` field in the default response give the number of rules\nthat were run in the analysis.\nFor very old analyses this data is not available,\nand `0` is returned in this field.\n\nIf you use the Accept header `application/sarif+json`,\nthe response contains the analysis data that was uploaded.\nThis is formatted as\n[SARIF version 2.1.0](https://docs.oasis-open.org/sarif/sarif/v2.1.0/cs01/sarif-v2.1.0-cs01.html).",
  input: CodeScanningGetAnalysisInput,
  output: CodeScanningGetAnalysisOutput,
  errors: [ForbiddenError, NotFoundError],
  func: async ({ github }, data) => {
    return github.call("GET", "/repos/{owner}/{repo}/code-scanning/analyses/{analysis_id}", data) as any
  },
})
