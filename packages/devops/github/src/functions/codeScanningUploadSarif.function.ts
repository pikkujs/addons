// code-scanning — Retrieve code scanning alerts from a repository.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const CodeScanningUploadSarifInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  checkout_uri: z.string().url().optional().describe("The base directory used in the analysis, as it appears in the SARIF file.\nThis property is used to convert file paths from absolute to relative, so that alerts can be mapped to their correct location in the repository."),
  commit_sha: z.string().min(40).max(40).regex(new RegExp("^[0-9a-fA-F]+$")).describe("The SHA of the commit to which the analysis you are uploading relates."),
  ref: z.string().describe("The full Git reference, formatted as `refs/heads/<branch name>`,\n`refs/pull/<number>/merge`, or `refs/pull/<number>/head`."),
  sarif: z.string().describe("A Base64 string representing the SARIF file to upload. You must first compress your SARIF file using [`gzip`](http://www.gnu.org/software/gzip/manual/gzip.html) and then translate the contents of the file into a Base64 encoding string. For more information, see \"[SARIF support for code scanning](https://docs.github.com/code-security/secure-coding/sarif-support-for-code-scanning).\""),
  started_at: z.string().datetime().optional().describe("The time that the analysis run began. This is a timestamp in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: `YYYY-MM-DDTHH:MM:SSZ`."),
  tool_name: z.string().optional().describe("The name of the tool used to generate the code scanning analysis. If this parameter is not used, the tool name defaults to \"API\". If the uploaded SARIF contains a tool GUID, this will be available for filtering using the `tool_guid` parameter of operations such as `GET /repos/{owner}/{repo}/code-scanning/alerts`."),
  validate: z.boolean().optional().describe("Whether the SARIF file will be validated according to the code scanning specifications.\nThis parameter is intended to help integrators ensure that the uploaded SARIF files are correctly rendered by code scanning."),
})

export const CodeScanningUploadSarifOutput = z.object({
  id: z.string().optional().describe("An identifier for the upload."),
  url: z.string().url().optional().describe("The REST API URL for checking the status of the upload."),
})

export const codeScanningUploadSarif = pikkuSessionlessFunc({
  description: "Uploads SARIF data containing the results of a code scanning analysis to make the results available in a repository. You must use an access token with the `security_events` scope to use this endpoint for private repositories. You can also use tokens with the `public_repo` scope for public repositories only. GitHub Apps must have the `security_events` write permission to use this endpoint.\n\nThere are two places where you can upload code scanning results.\n - If you upload to a pull request, for example `--ref refs/pull/42/merge` or `--ref refs/pull/42/head`, then the results appear as alerts in a pull request check. For more information, see \"[Triaging code scanning alerts in pull requests](/code-security/secure-coding/triaging-code-scanning-alerts-in-pull-requests).\"\n - If you upload to a branch, for example `--ref refs/heads/my-branch`, then the results appear in the **Security** tab for your repository. For more information, see \"[Managing code scanning alerts for your repository](/code-security/secure-coding/managing-code-scanning-alerts-for-your-repository#viewing-the-alerts-for-a-repository).\"\n\nYou must compress the SARIF-formatted analysis data that you want to upload, using `gzip`, and then encode it as a Base64 format string. For example:\n\n```\ngzip -c analysis-data.sarif | base64 -w0\n```\n<br>\nSARIF upload supports a maximum number of entries per the following data objects, and an analysis will be rejected if any of these objects is above its maximum value. For some objects, there are additional values over which the entries will be ignored while keeping the most important entries whenever applicable.\nTo get the most out of your analysis when it includes data above the supported limits, try to optimize the analysis configuration. For example, for the CodeQL tool, identify and remove the most noisy queries.\n\n\n| **SARIF data**                   | **Maximum values** | **Additional limits**                                                            |\n|----------------------------------|:------------------:|----------------------------------------------------------------------------------|\n| Runs per file                    |         20         |                                                                                  |\n| Results per run                  |       25,000       | Only the top 5,000 results will be included, prioritized by severity.            |\n| Rules per run                    |       25,000       |                                                                                  |\n| Tool extensions per run          |        100         |                                                                                  |\n| Thread Flow Locations per result |       10,000       | Only the top 1,000 Thread Flow Locations will be included, using prioritization. |\n| Location per result\t             |       1,000        | Only 100 locations will be included.                                             |\n| Tags per rule\t                   |         20         | Only 10 tags will be included.                                                   |\n\n\nThe `202 Accepted` response includes an `id` value.\nYou can use this ID to check the status of the upload by using it in the `/sarifs/{sarif_id}` endpoint.\nFor more information, see \"[Get information about a SARIF upload](/rest/reference/code-scanning#get-information-about-a-sarif-upload).\"",
  input: CodeScanningUploadSarifInput,
  output: CodeScanningUploadSarifOutput,
  errors: [BadRequestError, ForbiddenError, NotFoundError],
  func: async ({ github }, data) => {
    return github.call("POST", "/repos/{owner}/{repo}/code-scanning/sarifs", data) as any
  },
})
