// repos — Interact with GitHub Repos.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { NotFoundError } from '@pikku/core/errors'

export const ReposGetAllTopicsInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  page: z.number().int().optional().default(1).describe("Page number of the results to fetch."),
  per_page: z.number().int().optional().default(30).describe("The number of results per page (max 100)."),
})

export const ReposGetAllTopicsOutput = z.object({
  names: z.array(z.string()),
}).describe("A topic aggregates entities that are related to a subject.")

export const reposGetAllTopics = pikkuSessionlessFunc({
  input: ReposGetAllTopicsInput,
  output: ReposGetAllTopicsOutput,
  errors: [NotFoundError],
  func: async ({ github }, data) => {
    return github.call("GET", "/repos/{owner}/{repo}/topics", data) as any
  },
})
