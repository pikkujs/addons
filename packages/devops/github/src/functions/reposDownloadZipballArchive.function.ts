// repos — Interact with GitHub Repos.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ReposDownloadZipballArchiveInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  ref: z.string(),
})

export const reposDownloadZipballArchive = pikkuSessionlessFunc({
  description: "Gets a redirect URL to download a zip archive for a repository. If you omit `:ref`, the repository’s default branch (usually\n`main`) will be used. Please make sure your HTTP framework is configured to follow redirects or you will need to use\nthe `Location` header to make a second `GET` request.\n\n**Note**: For private repositories, these links are temporary and expire after five minutes. If the repository is empty, you will receive a 404 when you follow the redirect.",
  input: ReposDownloadZipballArchiveInput,
  func: async ({ github }, data) => {
    return github.call("GET", "/repos/{owner}/{repo}/zipball/{ref}", data)
  },
})
