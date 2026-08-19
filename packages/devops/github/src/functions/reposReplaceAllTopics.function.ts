// repos — Interact with GitHub Repos.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { NotFoundError, UnprocessableContentError } from '@pikku/core/errors'

export const ReposReplaceAllTopicsInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  names: z.array(z.string()).describe("An array of topics to add to the repository. Pass one or more topics to _replace_ the set of existing topics. Send an empty array (`[]`) to clear all topics from the repository. **Note:** Topic `names` cannot contain uppercase letters."),
})

export const ReposReplaceAllTopicsOutput = z.object({
  names: z.array(z.string()),
}).describe("A topic aggregates entities that are related to a subject.")

export const reposReplaceAllTopics = pikkuSessionlessFunc({
  input: ReposReplaceAllTopicsInput,
  output: ReposReplaceAllTopicsOutput,
  errors: [NotFoundError, UnprocessableContentError],
  func: async ({ github }, data) => {
    return github.call("PUT", "/repos/{owner}/{repo}/topics", data) as any
  },
})
