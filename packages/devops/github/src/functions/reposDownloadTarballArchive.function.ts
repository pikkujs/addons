// repos — Interact with GitHub Repos.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ReposDownloadTarballArchiveInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  ref: z.string(),
})

export const reposDownloadTarballArchive = pikkuSessionlessFunc({
  description: "Gets a redirect URL to download a tar archive for a repository. If you omit `:ref`, the repository’s default branch (usually\n`main`) will be used. Please make sure your HTTP framework is configured to follow redirects or you will need to use\nthe `Location` header to make a second `GET` request.\n**Note**: For private repositories, these links are temporary and expire after five minutes.",
  input: ReposDownloadTarballArchiveInput,
  func: async ({ github }, data) => {
    return github.call("GET", "/repos/{owner}/{repo}/tarball/{ref}", data)
  },
})
