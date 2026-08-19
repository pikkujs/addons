// search — Look for stuff on GitHub.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { ForbiddenError, NotFoundError, UnprocessableContentError } from '@pikku/core/errors'

export const SearchLabelsInput = z.object({
  repository_id: z.number().int().describe("The id of the repository."),
  q: z.string().describe("The search keywords. This endpoint does not accept qualifiers in the query. To learn more about the format of the query, see [Constructing a search query](https://docs.github.com/rest/reference/search#constructing-a-search-query)."),
  sort: z.enum(["created", "updated"]).optional().describe("Sorts the results of your query by when the label was `created` or `updated`. Default: [best match](https://docs.github.com/rest/reference/search#ranking-search-results)"),
  order: z.enum(["desc", "asc"]).optional().default("desc").describe("Determines whether the first search result returned is the highest number of matches (`desc`) or lowest number of matches (`asc`). This parameter is ignored unless you provide `sort`."),
  per_page: z.number().int().optional().default(30).describe("The number of results per page (max 100)."),
  page: z.number().int().optional().default(1).describe("Page number of the results to fetch."),
})

export const SearchLabelsOutput = z.object({
  incomplete_results: z.boolean(),
  items: z.array(z.object({
    color: z.string(),
    default: z.boolean(),
    description: z.string().nullable(),
    id: z.number().int(),
    name: z.string(),
    node_id: z.string(),
    score: z.number(),
    text_matches: z.array(z.object({
      fragment: z.string().optional(),
      matches: z.array(z.object({
        indices: z.array(z.number().int()).optional(),
        text: z.string().optional(),
      })).optional(),
      object_type: z.string().nullable().optional(),
      object_url: z.string().optional(),
      property: z.string().optional(),
    })).optional(),
    url: z.string().url(),
  })),
  total_count: z.number().int(),
})

export const searchLabels = pikkuSessionlessFunc({
  description: "Find labels in a repository with names or descriptions that match search keywords. Returns up to 100 results [per page](https://docs.github.com/rest/overview/resources-in-the-rest-api#pagination).\n\nWhen searching for labels, you can get text match metadata for the label **name** and **description** fields when you pass the `text-match` media type. For more details about how to receive highlighted search results, see [Text match metadata](https://docs.github.com/rest/reference/search#text-match-metadata).\n\nFor example, if you want to find labels in the `linguist` repository that match `bug`, `defect`, or `enhancement`. Your query might look like this:\n\n`q=bug+defect+enhancement&repository_id=64778136`\n\nThe labels that best match the query appear first in the search results.",
  input: SearchLabelsInput,
  output: SearchLabelsOutput,
  errors: [ForbiddenError, NotFoundError, UnprocessableContentError],
  func: async ({ github }, data) => {
    return github.call("GET", "/search/labels", data) as any
  },
})
