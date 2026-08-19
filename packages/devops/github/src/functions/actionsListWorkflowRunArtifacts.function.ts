// actions — Endpoints to manage GitHub Actions using the REST API.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ActionsListWorkflowRunArtifactsInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  run_id: z.number().int().describe("The unique identifier of the workflow run."),
  per_page: z.number().int().optional().default(30).describe("The number of results per page (max 100)."),
  page: z.number().int().optional().default(1).describe("Page number of the results to fetch."),
})

export const ActionsListWorkflowRunArtifactsOutput = z.object({
  artifacts: z.array(z.object({
    archive_download_url: z.string(),
    created_at: z.string().datetime().nullable(),
    expired: z.boolean().describe("Whether or not the artifact has expired."),
    expires_at: z.string().datetime().nullable(),
    id: z.number().int(),
    name: z.string().describe("The name of the artifact."),
    node_id: z.string(),
    size_in_bytes: z.number().int().describe("The size in bytes of the artifact."),
    updated_at: z.string().datetime().nullable(),
    url: z.string(),
    workflow_run: z.object({
      head_branch: z.string().optional(),
      head_repository_id: z.number().int().optional(),
      head_sha: z.string().optional(),
      id: z.number().int().optional(),
      repository_id: z.number().int().optional(),
    }).nullable().optional(),
  })),
  total_count: z.number().int(),
})

export const actionsListWorkflowRunArtifacts = pikkuSessionlessFunc({
  description: "Lists artifacts for a workflow run. Anyone with read access to the repository can use this endpoint. If the repository is private you must use an access token with the `repo` scope. GitHub Apps must have the `actions:read` permission to use this endpoint.",
  input: ActionsListWorkflowRunArtifactsInput,
  output: ActionsListWorkflowRunArtifactsOutput,
  func: async ({ github }, data) => {
    return github.call("GET", "/repos/{owner}/{repo}/actions/runs/{run_id}/artifacts", data) as any
  },
})
