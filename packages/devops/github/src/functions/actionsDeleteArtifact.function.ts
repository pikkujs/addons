// actions — Endpoints to manage GitHub Actions using the REST API.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ActionsDeleteArtifactInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  artifact_id: z.number().int().describe("The unique identifier of the artifact."),
})

export const actionsDeleteArtifact = pikkuSessionlessFunc({
  description: "Deletes an artifact for a workflow run. You must authenticate using an access token with the `repo` scope to use this endpoint. GitHub Apps must have the `actions:write` permission to use this endpoint.",
  input: ActionsDeleteArtifactInput,
  func: async ({ github }, data) => {
    return github.call("DELETE", "/repos/{owner}/{repo}/actions/artifacts/{artifact_id}", data)
  },
})
