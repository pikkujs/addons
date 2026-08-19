// reactions — Interact with reactions to various GitHub entities.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ReactionsDeleteForReleaseInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  release_id: z.number().int().describe("The unique identifier of the release."),
  reaction_id: z.number().int().describe("The unique identifier of the reaction."),
})

export const reactionsDeleteForRelease = pikkuSessionlessFunc({
  description: "**Note:** You can also specify a repository by `repository_id` using the route `DELETE delete /repositories/:repository_id/releases/:release_id/reactions/:reaction_id`.\n\nDelete a reaction to a [release](https://docs.github.com/rest/reference/repos#releases).",
  input: ReactionsDeleteForReleaseInput,
  func: async ({ github }, data) => {
    return github.call("DELETE", "/repos/{owner}/{repo}/releases/{release_id}/reactions/{reaction_id}", data)
  },
})
