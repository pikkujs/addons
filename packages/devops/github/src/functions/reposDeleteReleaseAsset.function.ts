// repos — Interact with GitHub Repos.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ReposDeleteReleaseAssetInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  asset_id: z.number().int().describe("The unique identifier of the asset."),
})

export const reposDeleteReleaseAsset = pikkuSessionlessFunc({
  input: ReposDeleteReleaseAssetInput,
  func: async ({ github }, data) => {
    return github.call("DELETE", "/repos/{owner}/{repo}/releases/assets/{asset_id}", data)
  },
})
