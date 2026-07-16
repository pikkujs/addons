// code-scanning — Retrieve code scanning alerts from a repository.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const CodeScanningGetSarifInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  sarif_id: z.string().describe("The SARIF ID obtained after uploading."),
})

export const CodeScanningGetSarifOutput = z.object({
  analyses_url: z.string().url().nullable().optional().describe("The REST API URL for getting the analyses associated with the upload."),
  errors: z.array(z.string()).nullable().optional().describe("Any errors that ocurred during processing of the delivery."),
  processing_status: z.enum(["pending", "complete", "failed"]).optional().describe("`pending` files have not yet been processed, while `complete` means results from the SARIF have been stored. `failed` files have either not been processed at all, or could only be partially processed."),
})

export const codeScanningGetSarif = pikkuSessionlessFunc({
  description: "Gets information about a SARIF upload, including the status and the URL of the analysis that was uploaded so that you can retrieve details of the analysis. For more information, see \"[Get a code scanning analysis for a repository](/rest/reference/code-scanning#get-a-code-scanning-analysis-for-a-repository).\" You must use an access token with the `security_events` scope to use this endpoint with private repos, the `public_repo` scope also grants permission to read security events on public repos only. GitHub Apps must have the `security_events` read permission to use this endpoint.",
  input: CodeScanningGetSarifInput,
  output: CodeScanningGetSarifOutput,
  errors: [ForbiddenError, NotFoundError],
  func: async ({ github }, data) => {
    return github.call("GET", "/repos/{owner}/{repo}/code-scanning/sarifs/{sarif_id}", data) as any
  },
})
