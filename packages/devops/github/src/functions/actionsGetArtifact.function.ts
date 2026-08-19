// actions — Endpoints to manage GitHub Actions using the REST API.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ActionsGetArtifactInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  artifact_id: z.number().int().describe("The unique identifier of the artifact."),
})

export const ActionsGetArtifactOutput = z.object({
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
}).describe("An artifact")

export const actionsGetArtifact = pikkuSessionlessFunc({
  description: "Gets a specific artifact for a workflow run. Anyone with read access to the repository can use this endpoint. If the repository is private you must use an access token with the `repo` scope. GitHub Apps must have the `actions:read` permission to use this endpoint.",
  input: ActionsGetArtifactInput,
  output: ActionsGetArtifactOutput,
  func: async ({ github }, data) => {
    return github.call("GET", "/repos/{owner}/{repo}/actions/artifacts/{artifact_id}", data) as any
  },
})
