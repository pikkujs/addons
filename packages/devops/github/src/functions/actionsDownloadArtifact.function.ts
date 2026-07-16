// actions — Endpoints to manage GitHub Actions using the REST API.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ActionsDownloadArtifactInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  artifact_id: z.number().int().describe("The unique identifier of the artifact."),
  archive_format: z.string(),
})

export const actionsDownloadArtifact = pikkuSessionlessFunc({
  description: "Gets a redirect URL to download an archive for a repository. This URL expires after 1 minute. Look for `Location:` in\nthe response header to find the URL for the download. The `:archive_format` must be `zip`. Anyone with read access to\nthe repository can use this endpoint. If the repository is private you must use an access token with the `repo` scope.\nGitHub Apps must have the `actions:read` permission to use this endpoint.",
  input: ActionsDownloadArtifactInput,
  func: async ({ github }, data) => {
    return github.call("GET", "/repos/{owner}/{repo}/actions/artifacts/{artifact_id}/{archive_format}", data)
  },
})
